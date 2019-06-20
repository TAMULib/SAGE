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

  $scope.discoveryContext = new DiscoveryContext({
    slug: $routeParams.slug,
  });

  $scope.discoveryContext.ready().then(function() {

    $scope.resetSearch = function() {
      if($scope.discoveryContext.searchFilters) {
        $scope.currentSearchFilter = $scope.discoveryContext.searchFilters[0];
      } 
      $scope.currentSearchValue = '';
    };

    $scope.resetSearch();

    $scope.removeFilter = function(filter) {
      $scope.discoveryContext.removeFilter(filter).then(function() {
        $scope.resetSearch();
      });
    };

    $scope.clearFilters = function() {
      $scope.discoveryContext.clearFilters().then(function() {
        $scope.resetSearch();
      });
    };
    
    $scope.searchProcessKeyPress = function($event) {
      if(event.keyCode === 13 && $scope.currentSearchFilter) {
        $scope.discoveryContext.addFilter($scope.currentSearchFilter.label, $scope.currentSearchFilter.key, $scope.currentSearchValue).then(function() {
          $scope.resetSearch();
        });
      }
    };

    $scope.pageBack = function() {
      if($scope.discoveryContext.search.start > 0) {
        $scope.discoveryContext.search.start -= $scope.discoveryContext.search.rows;
        $scope.discoveryContext.search.start = $scope.discoveryContext.search.start < 0 ? 0 : $scope.discoveryContext.search.start;
        $scope.discoveryContext.executeSearch(true).then(function() {
          $scope.resetSearch();
        });
      }
    };

    $scope.pageForward = function() {
      if($scope.discoveryContext.search.start < $scope.discoveryContext.search.total - $scope.discoveryContext.search.rows) {
        $scope.discoveryContext.search.start += $scope.discoveryContext.search.rows;
        $scope.discoveryContext.search.start = $scope.discoveryContext.search.start > $scope.discoveryContext.search.total ? $scope.discoveryContext.search.total : $scope.discoveryContext.search.start;
        $scope.discoveryContext.executeSearch(true).then(function() {
          $scope.resetSearch();
        });
      }
    };

  });

});