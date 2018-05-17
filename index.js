/**
 * Minify extension for Bundl
 */

var childProcess = require('child_process');

module.exports = function (options) {
    options = options || {};

    var opts = Object.assign({}, options.uglify);

    var cache = {};

    function minify (r, done) {
        var contentsString = r.contents.getString();
        var contentsHash = r.contents.getHash();
        var cached = contentsHash ? cache[contentsHash] : null;

        if (r.changed) {
            cache = {};
        }

        if (cached) {
            r.contents.set(cached);
            done();

        } else {
            var child = childProcess.fork(__dirname + '/process_uglify.js');
            child.on('message', (result) => {
                child.kill();
                if (result.error) {
                    throw new Error(result.error.stack);
                } else {
                    cache[contentsHash] = result.code;
                    r.contents.set(result.code);
                    done();
                }
            });
            child.send({
                contentsString,
                opts,
            });
        }
    }

    return {
        name: 'minify',
        stage: 'stringy',
        ext: ['js'],
        exec: minify,
    };

};


// var prefix = '//# sourceMappingURL=';
// var mapName;
// if (options.sourcemap) {
//     if (options.sourcemap === true) {
//         // url based on output filename
//         mapName = r.name + '.map';
//
//     } else if (options.sourcemap.inline) {
//         // inline the data
//         mapName = 'inline';
//
//     } else if (options.sourcemap.url) {
//         // use custom url if provided
//         mapName = options.sourcemap.url;
//     }
//     opts.outSourceMap = mapName;
// }

// if (mapName) {
//     if (mapName === 'inline') {
//         // replace `inline` with encoded map
//         var base64Map = new ArrayBuffer(JSON.stringify(sourceMap)).toString('base64');
//         result.code = result.code.replace(prefix + 'inline', prefix + 'data:application/json;charset=' + opts.charset + ';base64,' + base64Map);
//
//     } else {
//         // try to save sourcemap to disk
//         // utils.writeFile(path.resolve(path.dirname(r.dest), mapName), result.map);
//     }
// }
