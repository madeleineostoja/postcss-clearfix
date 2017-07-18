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
    .process(input, {
      from: fixture + '.css',
      map: {
        inline: false,
        annotation: false
      }
    })
    .then(function (result) {
      var map = result.map.toJSON(),
          warnings = result.warnings();
      expect(map.sourcesContent.length).to.equal(1);
      expect(map.sourcesContent[0]).to.match(/clear: fix/);
      expect(result.css).to.eql(expected);
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

  it('sets clear:fix with custom display correctly', function() {
    return test('fix-display', {
      display: 'table'
    });
  });

  it('handles multiple selectors and declerations', function() {
    return test('multiple', {});
  });

});
