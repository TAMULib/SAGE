sage.controller('DiscoveryContextController', function ($controller, $scope, $routeParams, DiscoveryContext, Search, Field) {

  angular.extend(this, $controller('CoreAdminController', {
      $scope: $scope
  }));

  var discoveryContext = new DiscoveryContext({
    slug: $routeParams.slug
  });

  discoveryContext.ready().then(function() {
    $scope.discoveryContext = discoveryContext;

    $scope.searchProcessKeyPress = function($event) {
      if(event.keyCode === 13 && $scope.currentSearchFilter) {
        var filter = {
          key: $scope.currentSearchFilter.name,
          value: $scope.currentSearchValue
        };
        $scope.discoveryContext.search.filters.push(filter);
        $scope.executeSearch().then(function() {
          $scope.currentSearchValue = "";
        });
      }
    };

    $scope.executeSearch = function() {
      $scope.discoveryContext.results.length = 0;
      return $scope.discoveryContext.reload();
    };

    $scope.removeFilter = function(filter) {
      for(var i = 0; i < $scope.discoveryContext.search.filters.length; i++) {
        var f = $scope.discoveryContext.search.filters[i];
        if(f.key === filter.key && f.value === filter.value) {
          $scope.discoveryContext.search.filters.splice(i, 1);
        }
      }
      $scope.executeSearch();
    };

  });

});