/*eslint no-unused-expressions: 0*/
'use strict';

var postcss = require('postcss'),
    expect = require('chai').expect,
    fs = require('fs'),
    path = require('path'),
    plugin = require('../');

function test(fixture, opts) {
  var input = fixture + '.css',
      expected = fixture + '.expected.css';

  input = fs.readFileSync(path.join(__dirname, 'fixtures', input), 'utf8').replace(/\r\n/g, '\n');
  expected = fs.readFileSync(path.join(__dirname, 'fixtures', expected), 'utf8').replace(/\r\n/g, '\n');

  return postcss([ plugin(opts) ])
    .process(input)
    .then(function (result) {
      expect(result.css).to.eql(expected);
      console.log(result.warnings());
      expect(result.warnings()).to.be.empty;
    });

};

describe('postcss-clearfix', function () {

  it('sets clear:fix correctly', function() {
   return test('fix', {});
  });

  it('sets clear:fix-legacy correctly', function() {
    return test('fix-legacy', {});
  });

  it('handles multiple selectors and declerations', function() {
    return test('multiple', {});
  });

});
