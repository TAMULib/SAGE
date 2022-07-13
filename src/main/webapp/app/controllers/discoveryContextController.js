sage.controller('DiscoveryContextController', function ($controller, $scope, $routeParams, $location, $sce, DiscoveryContext, appConfig) {

  angular.extend(this, $controller('CoreAdminController', {
    $scope: $scope
  }));

  $scope._keys = Object.keys;

  $scope.defaultThumbnailURI = appConfig.defaultThumbnailURI;

  $scope.rowOptions = [];

  var options = [10, 25, 50, 100];

  for (var i in options) {
    $scope.rowOptions.push({ value: options[i], label: options[i] + " Per Page"});
  }

  $scope.discoveryContext = new DiscoveryContext({
    slug: $routeParams.slug,
  });

  $scope.discoveryContext.ready().then(function() {

    $scope.getNarrowLogoClass = function() {
      return {'background-image': 'url(' + $scope.discoveryContext.logoUrl + ')'};
    };

    $scope.getWideLogoClass = function() {
      return {'background-image': 'url(' + $scope.discoveryContext.wideLogoUrl + ')'};
    };

    $scope.breadcrumbContexts = [
      $scope.discoveryContext
    ];

    $scope.prepareSearch = function(useQueryParams) {
      var i;

      if (useQueryParams) {
        if ($scope.discoveryContext.search.field === "") {
          $location.search("field", null);
        }

        if ($scope.discoveryContext.search.value === "") {
          $location.search("value", null);
        }

        if ($scope.discoveryContext.search.page.number === 0) {
          $location.search("page", null);
        }

        if (angular.isDefined($scope.discoveryContext.sortFields) && ($scope.discoveryContext.sortFields.length > 0)) {
          if ($scope.discoveryContext.search.page.sort === $scope.discoveryContext.sortFields[0].key) {
            $location.search("sort", null);
          }
        }

        if (options.indexOf($scope.discoveryContext.search.page.size) === -1) {
          $scope.discoveryContext.search.page.size = options[0];
          $location.search("size", options[0]);
        }

        if ($scope.discoveryContext.search.page.offset === 0) {
          $location.search("offset", null);
        }
      }

      if (!angular.isDefined($scope.discoveryContext.search.page.sort) &&($scope.discoveryContext.sortFields.length > 0)) {
        $scope.discoveryContext.search.page.sort = $scope.discoveryContext.sortFields[0].key;
      }

      if (!angular.isDefined($scope.discoveryContext.search.page.direction)) {
        $scope.discoveryContext.search.page.direction = $scope.discoveryContext.ascending ? "ASC" : "DESC";
        $location.search("direction", $scope.discoveryContext.search.page.direction);
      }

      if (angular.isDefined($scope.discoveryContext.searchFields)) {
        if ($scope.currentSearchField) {
          angular.forEach($scope.discoveryContext.searchFields, function(v,k) {
            if ($scope.currentSearchField.key === v.key) {
              $scope.currentSearchField = v;
            }
          });
        } else {
          $scope.currentSearchField = $scope.discoveryContext.searchFields[0];
        }
      }
    };

    $scope.prepareSearch(true);

    $scope.resetPage = function() {
      $scope.discoveryContext.resetPage().then(function() {
        $scope.prepareSearch();
      });
    };

    $scope.removeFilter = function(filter) {
      $scope.discoveryContext.removeFilter(filter).then(function() {
        $scope.prepareSearch();
      });
    };

    $scope.resetSearch = function() {
      $scope.currentSearchValue = "";
      $scope.discoveryContext.resetSearch().then(function() {
        $scope.prepareSearch();
      });
    };

    $scope.updateLimit = function() {
      if ($scope.discoveryContext.search.start > 0) {
        var number = $scope.discoveryContext.search.start / $scope.discoveryContext.search.page.size;
        $scope.discoveryContext.search.page.number = Math.floor(number);

        if (number == $scope.discoveryContext.search.page.number) {
          $scope.discoveryContext.search.page.offset = 0;
        } else {
          var offset = Math.abs($scope.discoveryContext.search.start - ($scope.discoveryContext.search.page.number * $scope.discoveryContext.search.page.size));
          $scope.discoveryContext.search.page.offset = offset;
        }

        $location.search("page", $scope.discoveryContext.search.page.number);
      }

      $scope.discoveryContext.executeSearch(true).then(function() {
        $scope.prepareSearch();
      });
    };

    $scope.updateSort = function() {
      $scope.discoveryContext.executeSearch(true).then(function() {
        $scope.prepareSearch();
      });
    };

    $scope.setCurrentSearchField = function(searchField) {
      $scope.currentSearchField = searchField;
    };

    $scope.search = function() {
        $scope.discoveryContext.setSearchField($scope.currentSearchField.key, window.encodeURIComponent($scope.currentSearchValue), $scope.findSearchFieldLabel($scope.currentSearchField.key));
        $scope.discoveryContext.executeSearch().then(function() {
          $scope.prepareSearch();
        });
    };

    $scope.searchProcessKeyPress = function(event) {
      if (event.keyCode === 13 && $scope.currentSearchField) {
        $scope.search();
      }
    };

    $scope.findSearchFieldLabel = function(field) {
      var label = "";

      if (angular.isDefined($scope.discoveryContext.searchFields)) {
        for (var i = 0; i < $scope.discoveryContext.searchFields.length; i++) {
          if ($scope.discoveryContext.searchFields[i].key === field) {
            label = $scope.discoveryContext.searchFields[i].label;
            break;
          }
        }
      }

      return label;
    };

    $scope.pageBack = function() {
      if ($scope.discoveryContext.search.start > 0) {
        if ($scope.discoveryContext.search.page.number > 0) {
          $scope.discoveryContext.search.page.number--;
        }
        else {
          $scope.discoveryContext.search.page.offset = 0;
          $location.search("offset", null);
        }

        $scope.discoveryContext.executeSearch(true).then(function() {
          $scope.prepareSearch();
        });
      }
    };

    $scope.pageForward = function() {
      if ($scope.discoveryContext.search.start < $scope.discoveryContext.search.total - $scope.discoveryContext.search.page.size) {
        $scope.discoveryContext.search.page.number++;
        $scope.discoveryContext.executeSearch(true).then(function() {
          $scope.prepareSearch();
        });
      }
    };

    $scope.hasActiveFilters = function() {
      return $scope.discoveryContext.search.filters.length > 0;
    };

    $scope.hasSearch = function() {
      return typeof $scope.discoveryContext.search.value === "string" && $scope.discoveryContext.search.value !== "";
    };

    $scope.presentCollectionText = function(value) {
      return $sce.trustAsHtml(value);
    };

    $scope.toggleSort = function() {
      $scope.discoveryContext.search.page.direction = $scope.discoveryContext.search.page.direction === "ASC" ? "DESC" : "ASC";
      $scope.search();
    };

    $scope.isAscending = function() {
      return $scope.discoveryContext.search.page.direction === "ASC";
    };
  });

});
