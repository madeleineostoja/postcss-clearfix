'use strict';

var postcss = require('postcss');

module.exports = postcss.plugin('postcss-clearfix', function () {
  return function (css) {

    /**
     * Clear: fix; rule handler
     * @param  {string} decl  current decleration
     */
    var clearFix = function(decl){

      var origRule = decl.parent,
          ruleSelector = origRule.selector,
          newRule = postcss.rule({
            selector: ruleSelector + ':after'
          });

      // Insert the :after rule before the original rule
      origRule.parent.insertBefore(origRule, newRule);
      newRule.append('content: \'\'; display: table; clear: both;');

      // If the original rule only had clear:fix in it, remove the whole rule
      if (decl.prev() === undefined && decl.next() === undefined) {
        origRule.removeSelf();
      } else {
        // Otherwise just remove the delcl
        decl.removeSelf();
      }

    };

    /**
     * Clear: fix-legacy; rule handler
     * @param  {string} decl  current decleration
     */
    var clearFixLegacy = function(decl) {

      var origRule = decl.parent,
        ruleSelector = origRule.selector,
        bothRule = postcss.rule({
          selector: ruleSelector + ':before' + ',\n' + ruleSelector + ':after'
        }),
        afterRule = postcss.rule({
          selector: ruleSelector + ':after'
        });

      // Insert new rules before the original rule
      origRule.parent.insertBefore(origRule, bothRule);
      origRule.parent.insertBefore(origRule, afterRule);

      bothRule.append('content: \'\'; display: table;');

      // Longhand syntax operates a little quicker, only single decls here so use it.
      afterRule.append({
        prop: 'clear',
        value: 'both'
      });

      origRule.append({
        prop: 'zoom',
        value: '1'
      });

      decl.removeSelf();
    };

    // Run handlers through all relevant CSS decls
    css.eachDecl('clear', function(decl) {

      var val = decl.value;


      switch (val) {

        // Pass all clear: fix; properties to clearFix()
        case 'fix':
          clearFix(decl);
          break;

        // Pass all clear: fix-legacy properties to clearFixLegacy()
        case 'fix-legacy':
          clearFixLegacy(decl);
          break;

      }

    });

  };
});
