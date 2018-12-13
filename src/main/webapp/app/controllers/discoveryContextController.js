sage.controller('DiscoveryContextController', function ($controller, $scope, $routeParams, $location, DiscoveryContext, Search, Field) {

  angular.extend(this, $controller('CoreAdminController', {
      $scope: $scope
  }));

  

  var discoveryContext = new DiscoveryContext({
    slug: $routeParams.slug,
  });

  var resetSearch = function() {
    $scope.currentSearchFilter = discoveryContext.fields[0];
    $scope.currentSearchValue = '';
  };

  discoveryContext.ready().then(function() {
    $scope.discoveryContext = discoveryContext;
    console.log($scope.discoveryContext);
    resetSearch();
    
    $scope.searchProcessKeyPress = function($event) {
      if(event.keyCode === 13 && $scope.currentSearchFilter) {
        var filter = {
          key: $scope.currentSearchFilter.name,
          value: $scope.currentSearchValue
        };
        $scope.discoveryContext.search.filters.push(filter);
        $scope.executeSearch();
      }
    };

    $scope.executeSearch = function() {
      $scope.discoveryContext.results.length = 0;
      var reoloadPromise = $scope.discoveryContext.reload();
      reoloadPromise.then(function() {
        console.log($scope.discoveryContext);
        $location.search($scope.discoveryContext.search.query);
        resetSearch();
      });
      return reoloadPromise;
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