# PostCSS Clearfix
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]

[PostCSS][PostCSS] plugin that adds a `fix` attribute to the `clear` property, for self-clearing of children. The outputted clearfix works in IE8+.

Part of [Rucksack - CSS Superpowers](http://simplaio.github.io/rucksack).

_Input_
```css
.cleared {
  clear: fix;
}
```

_Output_
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

[npm-image]: https://badge.fury.io/js/postcss-clearfix.svg
[npm-url]: https://npmjs.org/package/postcss-clearfix
[travis-image]: https://travis-ci.org/seaneking/postcss-clearfix.svg?branch=master
[travis-url]: https://travis-ci.org/seaneking/postcss-clearfix
[daviddm-image]: https://david-dm.org/seaneking/postcss-clearfix.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/seaneking/postcss-clearfix
[PostCSS]: https://github.com/postcss/postcss
