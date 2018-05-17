var minify = require('../../index.js');

function mockContents(c) {
    var _c = c;
    return {
        getHash: function () {
            return void 0;
        },
        getString: function () {
            return _c;
        },
        set: function (newC) {
            _c = newC;
        },
    };
}

describe('minify', function () {

    describe('before and after', function (expect, done) {
        var big = '(function(){ var unused = 123; function reallyLongName () { console.log("hello"); } reallyLongName(); })();';
        var small = '!function(){console.log("hello")}();';

        var r = {
            contents: mockContents(big),
        };
        minify().exec(r, function () {
            expect(r.contents.getString()).toBe(small);
            done();
        });
    });

});
