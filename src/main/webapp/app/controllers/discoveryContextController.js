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

  var resetSearch = function() {
    $scope.currentSearchFilter = $scope.discoveryContext.searchFilters[0];
    $scope.currentSearchValue = '';
  };

  var addFilter = function(label, key, value) {
    var filter = {
      label: label,
      key: key,
      value: value
    };
    $scope.discoveryContext.search.filters.push(filter);
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

  $scope.discoveryContext.ready().then(function() {
    resetSearch();
    
    $scope.searchProcessKeyPress = function($event) {
      if(event.keyCode === 13 && $scope.currentSearchFilter) {
        addFilter($scope.currentSearchFilter.label, $scope.currentSearchFilter.key, $scope.currentSearchValue);
        $scope.executeSearch();
      }
    };

    $scope.executeSearch = function(maintainPage) {
      if(!$scope.searching) {
        $scope.searching = true;
        if(!maintainPage) {
          $scope.discoveryContext.search.start = 0;
          $location.search("start", 0);
        }
        var reoloadPromise = $scope.discoveryContext.reload();
        reoloadPromise.then(function() {
          console.log($scope.discoveryContext);
          $scope.searching = false;
          $location.search($scope.discoveryContext.search.query);
          resetSearch();
        });
        return reoloadPromise;
      }
    };

    $scope.clearFilters = function() {
      $scope.discoveryContext.search.filters.length = 0;
      $scope.executeSearch();
    };

    $scope.addRemoveFacetFilter = function(facet, value) {

      var filter = $scope.findFilterByFacet(facet.label, value);

      if(filter) {
        $scope.removeFilter(filter);
      } else {
        addFilter(facet.label, facet.key, value);
      }
      $scope.executeSearch();
    };

    $scope.findFilterByFacet = function(facetLabel, facetName) {
      var filter = false;
      for(var i in $scope.discoveryContext.search.filters) {
        var f = $scope.discoveryContext.search.filters[i];
        if(f.label === facetLabel && f.value === facetName) {
          filter = f;
          break;
        }
      }
      return filter;
    };

    $scope.pageBack = function() {
      if($scope.discoveryContext.search.start > 0) {
        $scope.discoveryContext.search.start -= $scope.discoveryContext.search.rows;
        $scope.discoveryContext.search.start = $scope.discoveryContext.search.start < 0 ? 0 : $scope.discoveryContext.search.start;
        $scope.executeSearch(true);
      }
    };

    $scope.pageForward = function() {
      if($scope.discoveryContext.search.start < $scope.discoveryContext.search.total - $scope.discoveryContext.search.rows) {
        $scope.discoveryContext.search.start += $scope.discoveryContext.search.rows;
        $scope.discoveryContext.search.start = $scope.discoveryContext.search.start > $scope.discoveryContext.search.total ? $scope.discoveryContext.search.total : $scope.discoveryContext.search.start;
        $scope.executeSearch(true);
      }
    };

  });

});