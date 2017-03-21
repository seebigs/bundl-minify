var minify = require('../../index.js');

describe('minify', function () {

    describe('before and after', function (expect) {
        var big = '(function(){ var unused = 123; function reallyLongName () { console.log("hello"); } reallyLongName(); })();';
        var small = '!function(){!function(){console.log("hello")}()}();';

        var m = minify({ uglify: { warnings: false } }).one(big);
        expect(m).toBe(small);
    });

});
