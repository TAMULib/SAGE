sage.component("facetWidget", {
  templateUrl: "views/components/facetWidget.html",
  bindings: {
    facet: '=',
    discoveryContext: "=",
    resetSearch: "="
  },
  controller: function($scope, $filter) {

    $scope.facetIsEmpty = function() {
      return Object.keys($scope.$ctrl.facet.counts).length == 0;
    };

    $scope.addRemoveFacetFilter = function(facet, value) {
      var filter = $scope.findFilterByFacet(facet.label, value);
      if(filter) {
        $scope.$ctrl.discoveryContext.removeFilter(filter).then(function() {
          $scope.$ctrl.resetSearch();
        });
      } else {
        $scope.$ctrl.discoveryContext.addFilter(facet.label, facet.key, value).then(function() {
          $scope.$ctrl.resetSearch();
        });
      }
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

    $scope.getFacetCountKeys = function(viewValue) {
      var keys = [];
      if($scope.$ctrl.facet) {
        keys = Object.keys($scope.$ctrl.facet.counts);
      }
      return $filter('filter')(keys, viewValue);
    };
  }
});
