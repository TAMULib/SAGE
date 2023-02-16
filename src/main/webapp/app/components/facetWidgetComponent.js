sage.component("facetWidget", {
  templateUrl: "views/components/facetWidget.html",
  bindings: {
    facet: '=',
    discoveryContext: "=",
    resetSearch: "="
  },
  controller: function($scope, $filter, ModalService) {

    $scope.moreFacetsLabel = "";
    $scope.moreFacets = [];

    $scope.page = 0;

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

    $scope.addFacetFilter = function(facetName) {
      if (!$scope.findFilterByFacet($scope.$ctrl.facet.label, facetName)) {
        $scope.closeMoreFacets();
        angular.element("#moreFacetsModal-" + $filter('simpleAscii')($scope.$ctrl.facet.label)).on('hidden.bs.modal', function (e) {
          $scope.$ctrl.discoveryContext.addFilter($scope.$ctrl.facet.label, $scope.$ctrl.facet.key, facetName).then(function() {
            $scope.$ctrl.resetSearch();
          });
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
        $scope.countsList = Object.keys($scope.$ctrl.facet.counts)
          .map(function(key) {
            return {facetName: key, facetCount: $scope.$ctrl.facet.counts[key]};
          }
        );
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

    $scope.openMoreFacets = function() {
      var facets = Object.entries($scope.$ctrl.facet.counts)
        .map(facet => {
          return {facetName: facet[0], facetCount: facet[1]};
        });
      $scope.moreFacets.push(...facets);
      $scope.moreFacetsLabel = $scope.$ctrl.facet.label;

      ModalService.openModal("#moreFacetsModal-" + $filter('simpleAscii')($scope.$ctrl.facet.label));
    };

    $scope.closeMoreFacets = function() {
      ModalService.closeModal();
      $scope.page = 0;
      $scope.moreFacetsLabel = "";

      if (angular.isDefined($scope.moreFacets)) {
        $scope.moreFacets.length = 0;
      }
    };

    $scope.hasNext = function() {
      return $scope.moreFacets.length > $scope.page * 10 + 10;
    };

    $scope.hasPrevious = function() {
      return $scope.page != 0;
    };

    $scope.isLastPage = function() {
      return $scope.page * 10 + 10 > $scope.moreFacets.length;
    };

    $scope.firstPage = function() {
      $scope.page = 0;
    };

    $scope.nextPage = function() {
      $scope.page = $scope.page + 1;
    };

    $scope.previousPage = function() {
      $scope.page = $scope.page - 1;
    };

    $scope.lastPage = function() {
      $scope.page = Math.floor($scope.moreFacets.length / 10);
    };
  }
});
