'use strict';

var postcss = require('postcss'),
    expect = require('chai').expect,
    fs = require('fs'),
    path = require('path'),
    plugin = require('../');

process.chdir('test');

function readFixture(file) {
  file = path.join('fixtures', file);
  file = fs.readFileSync(file, 'utf8');
  // Fix windows linebreaks
  return file.replace(/\r\n/g, '\n');
}

function test(fixture, opts) {
  var input = readFixture(fixture + '.css'),
      expected = readFixture(fixture + '.expected.css');

  return postcss([ plugin(opts) ])
    .process(input)
    .then(function (result) {
      expect(result.css).to.eql(expected);
      var warnings = result.warnings();
      if (warnings.length) {
        console.log(warnings);
      }
      expect(warnings).to.be.empty;
  });

};

describe('postcss-clearfix', function () {

  it('sets clear:fix correctly', function() {
    return test('fix', {});
  });

  it('sets clear:fix with table correctly', function() {
    return test('fix-table', {
      display: 'table'
    });
  });

  it('sets clear:fix-legacy correctly', function() {
    return test('fix-legacy', {});
  });

  it('handles multiple selectors and declerations', function() {
    return test('multiple', {});
  });

});
