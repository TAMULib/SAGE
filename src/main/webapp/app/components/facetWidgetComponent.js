sage.component("facetWidget", {
  templateUrl: "views/components/facetWidget.html",
  bindings: {
    facet: '=',
    discoveryContext: "=",
    resetSearch: "=",
    moreFacets: "="
  },
  controller: function($scope, $controller, $filter) {

    angular.extend(this, $controller('DiscoveryContextController',
      {$scope: $scope}
    ));

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

    $scope.initialize = function() {
      if($scope.$ctrl.facet && $scope.$ctrl.facet.widget === "Link") {
        $scope.open = false;
        var facetNames = Object.keys($scope.$ctrl.facet.counts);
        for(var i in facetNames) {
          var facetName = facetNames[i];
          if ($scope.findFilterByFacet($scope.$ctrl.facet.label, facetName)) {
            $scope.open = true;
            break;
          }
        }
      }
    };

    $scope.moreFacets = function(facet) {
      angular.extend($scope.$ctrl.moreFacets, Object.entries(facet));
      $scope.openModal("#moreFacetsModal");
    };
  }
});
