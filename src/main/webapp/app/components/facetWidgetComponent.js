sage.component("facetWidget", {
  templateUrl: "views/components/facetWidget.html",
  bindings: {
    facet: '=',
    discoveryContext: "="
  },
  controller: function($scope) {
    
    $scope.addRemoveFacetFilter = function(facet, value) {
      var filter = $scope.findFilterByFacet(facet.label, value);
      if(filter) {
        $scope.$ctrl.discoveryContext.removeFilter(filter);
      } else {
        $scope.$ctrl.discoveryContext.addFilter(facet.label, facet.key, value);
      }
      $scope.$ctrl.discoveryContext.executeSearch();
    };

    $scope.findFilterByFacet = function(facetLabel, facetName) {
      var filter = false;
      for(var i in $scope.$ctrl.discoveryContext.search.filters) {
        var f = $scope.$ctrl.discoveryContext.search.filters[i];
        if(f.label === facetLabel && f.value === facetName) {
          filter = f;
          break;
        }
      }
      return filter;
    };

  }
});