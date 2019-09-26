sage.controller('DiscoveryContextController', function ($controller, $scope, $routeParams, $location, DiscoveryContext, appConfig) {

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

    $scope.resetSearch = function(useQueryParams) {
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

        if (angular.isDefined($scope.discoveryContext.sortFields)) {
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

        $scope.currentSearchField = "";
        if (angular.isDefined($scope.discoveryContext.searchFields)) {
          $scope.currentSearchField = $scope.discoveryContext.searchFields[0];

          if (angular.isDefined($routeParams.field)) {
            for (i = 0; i < $scope.discoveryContext.searchFields.length; i++) {
              if ($scope.discoveryContext.searchFields[i].key === $routeParams.field) {
                $scope.currentSearchField = $scope.discoveryContext.searchFields[i];
                break;
              }
            }
          }
        }

        $scope.currentSearchValue = "";
        if (angular.isDefined($routeParams.value)) {
          $scope.currentSearchValue = $routeParams.value;
        } else if (angular.isDefined($scope.discoveryContext.search.value)) {
          $scope.currentSearchValue = $scope.discoveryContext.search.value;
        }
      }
      else {
        $scope.currentSearchField = "";
        if (angular.isDefined($scope.discoveryContext.searchFields)) {
          $scope.currentSearchField = $scope.discoveryContext.searchFields[0];

          if (angular.isDefined($scope.discoveryContext.search.field)) {
            for (i = 0; i < $scope.discoveryContext.searchFields.length; i++) {
              if ($scope.discoveryContext.searchFields[i].key === $scope.discoveryContext.search.field) {
                $scope.currentSearchField = $scope.discoveryContext.searchFields[i];
                break;
              }
            }
          }
        }

        $scope.currentSearchValue = "";
        if (angular.isDefined($scope.discoveryContext.search.value)) {
          $scope.currentSearchValue = $scope.discoveryContext.search.value;
        }
      }
    };

    $scope.resetSearch(true);

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
        $scope.resetSearch();
      });
    };

    $scope.updateSort = function() {
      $scope.discoveryContext.executeSearch(true).then(function() {
        $scope.resetSearch();
      });
    };

    $scope.searchProcessKeyPress = function($event) {
      if (event.keyCode === 13 && $scope.currentSearchField) {
        $scope.discoveryContext.setSearchField($scope.currentSearchField.key, $scope.currentSearchValue);
        $scope.discoveryContext.executeSearch().then(function() {
          $scope.resetSearch();
        });
      }
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
          $scope.resetSearch();
        });
      }
    };

    $scope.pageForward = function() {
      if ($scope.discoveryContext.search.start < $scope.discoveryContext.search.total - $scope.discoveryContext.search.page.size) {
        $scope.discoveryContext.search.page.number++;
        $scope.discoveryContext.executeSearch(true).then(function() {
          $scope.resetSearch();
        });
      }
    };
  });

});
