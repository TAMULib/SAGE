sage.directive("breadcrumbs", function() {
  return {
    templateUrl: "views/directives/breadcrumbs.html",
    restrict: "E",
    scope: {
      home: "=",
      contexts: "=",
      reload: "="
    },
    link: function($scope, attr, elem) {
      $scope.getBreadcrumbs = function() {
        $scope.breadcrumbs = [];

        for (var i = 0; i < $scope.contexts.length; i++) {
          $scope.breadcrumbs.push($scope.contexts[i].getBreadcrumb());
          $scope.breadcrumbs[i].active = false;
        }

        console.log("DEBUG: reloadAction = ");
        console.log($scope.reload);
/*
        if (!$scope.home && $scope.breadcrumbs.length > 0) {
          $scope.home = $scope.breadcrumbs.shift();

          if ($scope.breadcrumbs.length == 0) {
            $scope.home.active = true;
          }
        }
*/
        if ($scope.breadcrumbs.length > 0) {
          $scope.current = $scope.breadcrumbs[$scope.breadcrumbs.length - 1];
          $scope.current.active = true;
          $scope.breadcrumbs.length--;
        }
      };
    }
  };
});
