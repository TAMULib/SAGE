sage.directive('defaultSrc', function($http) {
  return {
    restrict: 'A',
    scope: {
      defaultSrc: "="
    },
    link: function($scope, element, attrs) {
      attrs.$observe('ngSrc', function(ngSrc) {
        element.bind('error', function() {
          element.attr('src', $scope.defaultSrc); // set default image
       });
      });
    }
  };
});