'use strict';

const postcss = require('postcss');

const DEFAULT_OPTIONS = {
  display: 'block'
};

/**
 * Clear: fix; rule handler
 * @param  {string} decl  current declaration
 */
function clearFix(decl, opts) {

  let origRule = decl.parent,
      ruleSelectors = origRule.selectors,
      newRule;

  if (decl.value !== 'fix') {
    return;
  }

  ruleSelectors = ruleSelectors
    .map(ruleSelector => ruleSelector + '::after').join(',\n');

  // Insert the :after rule before the original rule
  newRule = origRule.cloneAfter({
    selector: ruleSelectors
  }).removeAll();



  newRule.append({
    prop: 'content',
    value: '\'\'',
    source: decl.source
  }, {
    prop: 'display',
    value: opts.display,
    source: decl.source
  }, {
    prop: 'clear',
    value: 'both',
    source: decl.source
  });

  // If the original rule only had clear:fix in it, remove the whole rule
  if (decl.prev() === undefined && decl.next() === undefined) {
    origRule.remove();
  } else {
    // Otherwise just remove the decl
    decl.remove();
  }

}

module.exports = postcss.plugin('postcss-clearfix', function(opts) {
  opts = opts || {};
  opts = Object.assign({}, DEFAULT_OPTIONS, opts);

  return function(css) {

    css.walkDecls('clear', function(decl) {
      clearFix(decl, opts);
    });

  };
});
