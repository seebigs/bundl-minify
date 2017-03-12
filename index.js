/**
 * Minify extension for Bundl
 */

var path = require('path');
var ugly = require('uglify-js');

module.exports = function (options) {
    options = options || {};

    var opts = {
        charset: options.charset || 'utf8',
        fromString: true,
        warnings: typeof options.warnings === 'undefined' ? true : options.warnings,
        output: options.output
    };

    var prefix = '//# sourceMappingURL=';

    function one (contents, r) {
        var bundl = this;
        var mapName, result;

        if (options.sourcemap) {
            if (options.sourcemap === true) {
                // url based on output filename
                mapName = r.name + '.map';

            } else if (options.sourcemap.inline) {
                // inline the data
                mapName = 'inline';

            } else if (options.sourcemap.url) {
                // use custom url if provided
                mapName = options.sourcemap.url;
            }
            opts.outSourceMap = mapName;
        }

        result = ugly.minify(contents, opts);

        if (mapName) {
            if (mapName === 'inline') {
                // replace `inline` with encoded map
                var base64Map = new ArrayBuffer(JSON.stringify(sourceMap)).toString('base64');
                result.code = result.code.replace(prefix + 'inline', prefix + 'data:application/json;charset=' + opts.charset + ';base64,' + base64Map);

            } else {
                // try to save sourcemap to disk
                bundl.utils.writeFile(path.resolve(path.dirname(r.dest), mapName), result.map);
            }
        }

        return result.code;
    }

    return {
        one: one
    };

};
