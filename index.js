'use strict';

var postcss = require('postcss');

module.exports = postcss.plugin('postcss-clearfix', function () {
  return function (css) {

    // build our clear: fix; handler
    var clearFix = function(decl){

      var origRule = decl.parent,
          ruleSelector = origRule.selector,
          newRule = postcss.rule({
            selector: ruleSelector + ':after'
          });

      // insert the :after rule before the original rule
      origRule.parent.insertBefore(origRule, newRule);

      // create the necessary declarations in our new rule
      newRule.append('content: \'\'; display: table; clear: both;');

      // if the original rule only had clear:fix in it, remove the whole rule
      if (decl.prev() === undefined && decl.next() === undefined) {
        origRule.removeSelf();
      } else {
        // otherwise just remove the clear: delcaration
        decl.removeSelf();
      }

    };

    // build our clear: fix-legacy handler
    var clearFixLegacy = function(decl) {

      var origRule = decl.parent,
        ruleSelector = origRule.selector,
        bothRule = postcss.rule({
          selector: ruleSelector + ':before' + ',\n' + ruleSelector + ':after'
        }),
        afterRule = postcss.rule({
          selector: ruleSelector + ':after'
        });

      // insert the new rules before the original rule
      origRule.parent.insertBefore(origRule, bothRule);
      origRule.parent.insertBefore(origRule, afterRule);

      // create the necessary declarations in our new rules
      bothRule.append('content: \'\'; display: table;');

      // longhand syntax operates a little quicker, only single decl's here so use it.
      afterRule.append({
        prop: 'clear',
        value: 'both'
      });

      origRule.append({
        prop: 'zoom',
        value: '1'
      });

      // remove the original clear: legacy-fix; declaration
      decl.removeSelf();
    };

    // build our plugin handler
    var ruleHandler = function(decl) {

      var prop = decl.prop,
          val = decl.value;

      // if we're not dealing with a clear: declaration exit
      if (prop !== 'clear') {
        return;
      }

      // pass all clear: fix; properties to the clearFix handler
      if (val === 'fix') {
        clearFix(decl);
      }

      // pass all clear: fix-legacy; properties to the clearFixLegacy handler
      if (val === 'fix-legacy') {
        clearFixLegacy(decl);
      }

    };

    // loop through each css rule and declaration, and run our plugin through them
    css.eachRule(function(rule) {
      rule.each(ruleHandler);
    });

  };
});
