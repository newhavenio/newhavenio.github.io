# webcomponentsjs [![NPM version][npm-image]][npm-url]
> The popular WebComponents polyfill in a nice, frequently updated NPM package.

## Usage

Install `webcomponentsjs` as a dependency:

```shell
npm install webcomponentsjs
```

The polyfill traditionally comes in two standard sizes and this version adds an additional one 
that is significantly smaller!

#### full
includes the Custom Elements, HTML Imports, Shadow DOM and Templates polyfills.
(260kb)

#### lite
includes everything from the full polyfill except for the Shadow DOM.
(79kb)

#### micro
Includes polyfills for only Custom Elements and Templates.
NOTE: The micro package doesn't include the polyfill for the [URL()] (https://developer.mozilla.org/en-US/docs/Web/API/URL/URL) object
because they were only needed for the HTMLImports polyfill.
(40kb)


To use it, import it as a dependency from your code:


```shell
import "webcomponentsjs"
```

If you want to load the lite or micro versions, use:

```shell
import "webcomponentsjs/lite"
```

or 

```shell
import "webcomponentsjs/micro"
```

That's it!

[npm-url]: https://npmjs.org/package/webcomponentsjs
[npm-image]: https://badge.fury.io/js/webcomponentsjs.svg