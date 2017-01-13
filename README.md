# bundl-minify

*Minify your bundles for smaller, production-ready code*

*Runs with the amazing [Bundl](https://github.com/seebigs/bundl) build tool*

## Install

```
$ npm install --save-dev bundl-minify
```

## Use

```js
var bundl = require('bundl');
var minify = require('bundl-minify');

bundl(targets)
    .then(minify())
    .then(write());
```

## Options

### charset
Defaults to `utf8`

### sourcemap
*Experimental*

- true = export with same name as bundle.js.map
- { inline: true } = put map inline at bottom of bundle
