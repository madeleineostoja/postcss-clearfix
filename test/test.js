'use strict';

const postcss = require('postcss');
const expect = require('chai').expect;
const fs = require('fs');
const path = require('path');
const plugin = require('../');

process.chdir('test');

function readFixture(file) {
  file = path.join('fixtures', file);
  file = fs.readFileSync(file, 'utf8');
  // Fix windows linebreaks
  return file.replace(/\r\n/g, '\n');
}

function test(fixture, opts) {
  let input = readFixture(fixture + '.css'),
      expected = readFixture(fixture + '.expected.css');

  return postcss([ plugin(opts) ])
    .process(input, {
      from: fixture + '.css',
      map: {
        inline: false,
        annotation: false
      }
    })
    .then(result => {
      let map = result.map.toJSON(),
          warnings = result.warnings();
      expect(map.sourcesContent.length).to.equal(1);
      expect(map.sourcesContent[0]).to.match(/clear: fix/);
      expect(result.css).to.eql(expected);
      expect(warnings).to.be.empty;
    });

}

describe('postcss-clearfix', () => {
  it('sets clear:fix correctly', () => test('fix', {}));
  it('sets clear:fix with custom display correctly', () => test('fix-display', { display: 'table' }));
  it('handles multiple selectors and declerations', () => test('multiple', {}));
  it('leaves other clear properties alone', () => test('other-clears', {}));
});
