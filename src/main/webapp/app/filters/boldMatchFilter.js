sage.filter('boldMatch', function() {
  return function(input, match) {
    if (angular.isDefined(input)) {
      if (angular.isDefined(match) && angular.isString(match) && match.length > 0) {
        return input.replace(match, "<b>" + match + "</b>");
      }

      return input.replace(match, "");
    }

    return "";
  };
});
