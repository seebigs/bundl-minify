var uglify = require('uglify-es');

process.on('message', (input) => {
    var result = uglify.minify(input.contentsString, input.opts);
    process.send(result);
});
