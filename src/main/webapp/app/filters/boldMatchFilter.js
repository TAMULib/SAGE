sage.filter('boldMatch', function() {
  return function(input, match) {
    return input.replace(match, "<b>" + match + "</b>");
  };
});
