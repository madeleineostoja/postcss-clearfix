/*eslint no-unused-expressions: 0*/
'use strict';

var postcss = require('postcss'),
    expect = require('chai').expect,
    plugin = require('../');

var test = function (input, output, opts, done) {
  postcss([ plugin(opts) ]).process(input).then(function (result) {
    expect(result.css).to.eql(output);
    expect(result.warnings()).to.be.empty;
    done();
  }).catch(function (error) {
    done(error);
  });
};

describe('postcss-clearfix', function () {

  it('sets clear:fix correctly', function (done) {
   test('a{ clear: fix; }',
        'a:after {\n    content: \'\';\n    display: table;\n    clear: both\n}', { }, done);
  });

  it('sets clear:fix-legacy correctly', function (done) {
    test('a{ clear: fix-legacy; }',
         'a:before,\na:after{ content: \'\'; display: table; }\na:after{ clear: both; }\na{ zoom: 1; }', { }, done);
  });

  it('does\'t destroy the node if there\'s more than one declaration in it', function (done) {
    test('a{ clear: fix; color: #fff; }',
         'a:after{ content: \'\'; display: table; clear: both; }\na{ color: #fff; }', { }, done);
  });

});
