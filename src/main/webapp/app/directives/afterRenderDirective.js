sage.directive('afterRender', function ($timeout) {
  var def = {
    restrict: 'A',
    terminal: true,
    transclude: false,
    link: function (scope, element, attrs) {
      $timeout(scope.$eval(attrs.afterRender));
    }
  };
  return def;
});