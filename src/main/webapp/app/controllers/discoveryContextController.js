sage.controller('DiscoveryContextController', function ($controller, $scope, $routeParams, DiscoveryContext, Search, Field) {

  angular.extend(this, $controller('CoreAdminController', {
      $scope: $scope
  }));

  $scope.filters = {};

  var discoveryContext = new DiscoveryContext({
    slug: $routeParams.slug
  });

  discoveryContext.ready().then(function() {
    $scope.discoveryContext = discoveryContext;

    $scope.searchProcessKeyPress = function($event) {
      if(event.keyCode === 13) {
        $scope.executeSearch();
      }
    };

    $scope.executeSearch = function() {
      if($scope.currentSearchFilter) {
        $scope.filters[$scope.currentSearchFilter.name] = angular.copy($scope.currentSearchValue);
      }
      $scope.discoveryContext.results.length = 0;
      $scope.discoveryContext.reload().then(function() {
        $scope.currentSearchValue = "";
      });
    };

    $scope.removeFilter = function(key) {
      delete $scope.filters[key];
      $scope.executeSearch();
    };

  });

});