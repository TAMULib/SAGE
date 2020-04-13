sage.filter('availableOperator', function() {
  return function(input, usedOps) {
    return input.filter(function(val) {
      return !usedOps.some(function(op) {
        return op.id === val.id;
      });
    });
  };
});
