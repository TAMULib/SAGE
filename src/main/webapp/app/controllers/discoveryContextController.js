sage.controller('DiscoveryContextController', function ($controller, $scope, $routeParams, $location, DiscoveryContext) {

  angular.extend(this, $controller('CoreAdminController', {
      $scope: $scope
  }));

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

  discoveryContext.ready().then(function() {
    $scope.discoveryContext = discoveryContext;
    console.log($scope.discoveryContext);
    resetSearch();
    
    $scope.searchProcessKeyPress = function($event) {
      if(event.keyCode === 13 && $scope.currentSearchFilter) {
        addFilter($scope.currentSearchFilter.label, $scope.currentSearchFilter.key, $scope.currentSearchValue);
        $scope.executeSearch();
      }
    };

    $scope.executeSearch = function() {
      $scope.searching = true;
      var reoloadPromise = $scope.discoveryContext.reload();
      reoloadPromise.then(function() {
        console.log($scope.discoveryContext);
        $scope.searching = false;
        $location.search($scope.discoveryContext.search.query);
        resetSearch();
      });
      return reoloadPromise;
    };

    $scope.addFacetFilter = function(facet, value) {
      addFilter(facet.label, facet.key, value);
      $scope.executeSearch();
    };

    $scope.pageBack = function() {
      if(discoveryContext.search.start > 0) {
        discoveryContext.search.start -= discoveryContext.search.rows;
        discoveryContext.search.start = discoveryContext.search.start < 0 ? 0 : discoveryContext.search.start;
        $scope.executeSearch();
      }
    };

    $scope.pageForward = function() {
      if(discoveryContext.search.start < discoveryContext.search.total - discoveryContext.search.rows) {
        discoveryContext.search.start += discoveryContext.search.rows;
        discoveryContext.search.start = discoveryContext.search.start > discoveryContext.search.total ? discoveryContext.search.total : discoveryContext.search.start;
        $scope.executeSearch();
      }
    };

  });

});