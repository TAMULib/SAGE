sage.filter('removeBrackets', function() {
  return function(input, match) {
    return input ? input.replace("[", "").replace("]", "") : "";
  };
});