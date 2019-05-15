sage.controller('DiscoveryContextController', function ($controller, $scope, $routeParams, $location, DiscoveryContext, appConfig) {

  angular.extend(this, $controller('CoreAdminController', {
      $scope: $scope
  }));

  $scope._keys = Object.keys;

  $scope.defaultThumbnailURI = appConfig.defaultThumbnailURI;

  $scope.rowOptions = [];

  var options = [10,25,50,100];
  
  for(var i in options) {
    $scope.rowOptions.push({ value: options[i], label: options[i] + " Per Page"});
  }

  var discoveryContext = new DiscoveryContext({
    slug: $routeParams.slug,
  });

  var resetSearch = function() {
    $scope.currentSearchFilter = discoveryContext.searchFilters[0];
    $scope.currentSearchValue = '';
  };

  discoveryContext.ready().then(function() {
    $scope.discoveryContext = discoveryContext;
    resetSearch();
    
    $scope.searchProcessKeyPress = function($event) {
      if(event.keyCode === 13 && $scope.currentSearchFilter) {
        discoveryContext.addFilter($scope.currentSearchFilter.label, $scope.currentSearchFilter.key, $scope.currentSearchValue);
        $scope.discoveryContext.executeSearch();
      }
    };

    $scope.clearFilters = function() {
      $scope.discoveryContext.search.filters.length = 0;
      $scope.discoveryContext.executeSearch();
    };

    $scope.pageBack = function() {
      if(discoveryContext.search.start > 0) {
        discoveryContext.search.start -= discoveryContext.search.rows;
        discoveryContext.search.start = discoveryContext.search.start < 0 ? 0 : discoveryContext.search.start;
        $scope.executeSearch(true);
      }
    };

    $scope.pageForward = function() {
      if(discoveryContext.search.start < discoveryContext.search.total - discoveryContext.search.rows) {
        discoveryContext.search.start += discoveryContext.search.rows;
        discoveryContext.search.start = discoveryContext.search.start > discoveryContext.search.total ? discoveryContext.search.total : discoveryContext.search.start;
        $scope.executeSearch(true);
      }
    };

  });

});