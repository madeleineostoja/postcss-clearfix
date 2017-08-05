# PostCSS Clearfix
[![NPM version][npm-badge]][npm-url] [![Downloads][downloads-badge]][npm-url] [![Build Status][travis-image]][travis-url]

[PostCSS][PostCSS] plugin that adds a native `fix` value to the CSS `clear` property, for self-clearing children. The output clearfix works in IE8+.

_Part of [Rucksack - CSS Superpowers](http://simplaio.github.io/rucksack)_

**Input**

```css
.cleared {
  clear: fix;
}
```

**Output**

```css
.cleared:after{
  content: '';
  display: block;
  clear: both;
}
```

### Usage

```js
postcss([ require('postcss-clearfix') ])
```

See [PostCSS][PostCSS] docs for examples for your environment.

### Options

Property  | Type   | Default   | Description                                                                                                                    
--------- | ------ | --------- | ------------                                                                                                                     
`display` | String | `'block'` | Set the display property outputted in the `::after` clearfix (eg: use `'table'` to prevent collapsed margins on cleared items) 

***

MIT © [Sean King](https://twitter.com/seaneking)

[npm-badge]: https://badge.fury.io/js/postcss-clearfix.svg
[npm-url]: https://npmjs.org/package/postcss-clearfix
[downloads-badge]: https://img.shields.io/npm/dm/postcss-clearfix.svg
[travis-image]: https://travis-ci.org/seaneking/postcss-clearfix.svg?branch=master
[travis-url]: https://travis-ci.org/seaneking/postcss-clearfix
[PostCSS]: https://github.com/postcss/postcss
