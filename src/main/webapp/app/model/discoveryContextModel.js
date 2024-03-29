sage.model("DiscoveryContext", function ($q, $location, $routeParams, Field, ManifestService, Result, Search, WsApi) {
  return function DiscoveryContext() {

    var discoveryContext = this;
    var searching;
    var defaultPageSize = 10;
    var defaultDirection = null;
    var sortedActiveFilterKeys = [];

    var fetchContext = function () {
      if (angular.isDefined(discoveryContext.ascending)) {
        defaultDirection = discoveryContext.ascending ? "ASC" : "DESC";
      }

      var parameters = {
        pathValues: {
          slug: discoveryContext.slug
        },
        query: {
          field: angular.isDefined(discoveryContext.search.field) ? discoveryContext.search.field : "",
          value: angular.isDefined(discoveryContext.search.value) ? discoveryContext.search.value : "",
          page: angular.isDefined(discoveryContext.search.page.number) ? discoveryContext.search.page.number : 0,
          size: angular.isDefined(discoveryContext.search.page.size) ? discoveryContext.search.page.size : defaultPageSize,
          offset: angular.isDefined(discoveryContext.search.page.offset) ? discoveryContext.search.page.offset : 0,
          direction: angular.isDefined(discoveryContext.search.page.direction) ? discoveryContext.search.page.direction : defaultDirection
        }
      };

      if (angular.isDefined(discoveryContext.search.page.sort)) {
        parameters.query.sort = discoveryContext.search.page.sort;
      }

      angular.forEach(discoveryContext.search.filters, function(filter) {
        var filterKey = "f." + filter.key;
        if (!angular.isDefined(parameters.query[filterKey])) {
          parameters.query[filterKey] = [];
        }
        //the service uses the fv:: prefix to understand and process multiple values for the same filter key
        if (Array.isArray(filter.value)) {
          var groupedValue = "";
          angular.forEach(filter.value, function(value) {
            groupedValue += "fv::"+value+",";
            if (!hasSortedActiveFilterKey(filter.key, value)) {
              addSortedActiveFilterKey(filter.key, value);
            }
          });
          groupedValue = groupedValue.slice(0,-1);
          parameters.query[filterKey].push(encodeURIComponent(groupedValue));
        } else {
          if (!hasSortedActiveFilterKey(filter.key, filter.value)) {
            addSortedActiveFilterKey(filter.key, filter.value);
          }
          parameters.query[filterKey].push(encodeURIComponent("fv::"+filter.value));
        }
      });
      return WsApi.fetch(discoveryContext.getMapping().load, parameters);
    };

    var populateProperty = function(pname, ctor) {
      for (var i in discoveryContext[pname]) {
        discoveryContext[pname][i] = new ctor(discoveryContext[pname][i]);
      }
    };

    discoveryContext.before(function () {
      var filters = [];
      var pattern = /#/;

      angular.forEach($routeParams, function(value, key) {
        if (key.match(/^f\./i)) {
          var filter = {
            key: key.replace(/^f\./, "").replace(pattern, "%23"),
            value: value
          };
          filters.push(filter);
        }
      });

      discoveryContext.search = new Search({
        field: angular.isDefined($routeParams.field) ? $routeParams.field.replace(pattern, "%23") : "",
        value: angular.isDefined($routeParams.value) ? $routeParams.value.replace(pattern, "%23") : "",
        label: "",
        filters: filters,
        start: 0,
        total: 0,
        page: discoveryContext.buildPage()
      });

      return discoveryContext.reload();
    });

    discoveryContext.reload = function() {
      var defer = $q.defer();

      fetchContext().then(function (res) {
        var payload = angular.fromJson(res.body).payload.DiscoveryContext;
        var search = payload.search;

        // do not override local search settings, only these search properties are needed.
        var page = Number(search.page);
        if (!isNaN(page)) {
          discoveryContext.search.page.number = page;
          $location.search("page", discoveryContext.search.page.number);
        }
        discoveryContext.search.field = search.field;
        discoveryContext.search.label = search.label;
        discoveryContext.search.value = search.value;
        discoveryContext.search.filters = search.filters ? search.filters : [];
        discoveryContext.search.start = search.start;
        discoveryContext.search.total = search.total;
        delete payload.search;

        angular.extend(discoveryContext, payload);

        populateProperty("results", Result);
        populateProperty("fields", Field);

        angular.forEach(discoveryContext.results, function(value, key) {
          var specialKeys = ["title", "manifestUriKey", "resourceLocationUriKey", "resourceThumbnailUriKey", "uniqueIdentifier"];
          angular.forEach(specialKeys, function(key) {
            if (value[key]) {
              value[key] = JSON.parse(value[key])[0];
            }
          });

          angular.forEach(value.fields, function(field, fieldName) {
            if (field.value.startsWith("[") && field.value.endsWith("]")) {
              field.value = JSON.parse(field.value);
            }
          });

          if (!value.resourceThumbnailUriKey) {
            value.resourceThumbnailUriKey = 'temp';
            if (value.manifestUriKey) {
              ManifestService.getThumbnailUrl(value.manifestUriKey)
                .then(function(thumbnailUrl) {
                  value.resourceThumbnailUriKey = thumbnailUrl;
                })
                .catch(function(error) {
                  window.dispatchEvent(new CustomEvent("manifestError", error));
                });
            }
          }
        });
        defer.resolve(discoveryContext);
      });

      return defer.promise;
    };

    discoveryContext.setSearchField = function(key, value, label) {
      discoveryContext.search.field = key;
      discoveryContext.search.value = value;
      discoveryContext.search.label = label;
    };

    discoveryContext.addFilter = function(label, key, value) {
      var filter = {
        label: label,
        key: key,
        value: value
      };

      if (!discoveryContext.search.filters) {
        discoveryContext.search.filters = [];
      }
      addSortedActiveFilterKey(filter.key, filter.value);
      discoveryContext.search.filters.push(filter);

      var urlKey = "f." + filter.key;
      var existingValues = discoveryContext.buildUrlFilterKeyValues();

      $location.search(urlKey, existingValues[urlKey]);
      return discoveryContext.executeSearch();
    };

    discoveryContext.removeFilter = function(filter) {
      removeSortedActiveFilterKey(filter);

      for (var i = 0; i < discoveryContext.search.filters.length; i++) {
        var f = discoveryContext.search.filters[i];
        if (f.key === filter.key && f.value === filter.value) {
          discoveryContext.search.filters.splice(i, 1);

          var urlKey = "f." + filter.key;
          var existingValues = discoveryContext.buildUrlFilterKeyValues();

          if (existingValues && angular.isDefined(existingValues[urlKey])) {
            $location.search(urlKey, existingValues[urlKey]);
          } else {
            $location.search(urlKey, null);
          }

          break;
        }
      }

      return discoveryContext.executeSearch();
    };

    discoveryContext.clearCommon = function() {
      discoveryContext.search.field = "";
      discoveryContext.search.value = "";
      discoveryContext.search.label = "";

      $location.search("field", null);
      $location.search("value", null);
    };

    discoveryContext.resetPage = function() {
      discoveryContext.clearCommon();

      discoveryContext.search.filters.length = 0;
      discoveryContext.search.page.number = 0;
      discoveryContext.search.page.size = defaultPageSize;
      delete discoveryContext.search.page.sort;
      discoveryContext.search.page.offset = 0;
      discoveryContext.search.page.direction = defaultDirection;

      angular.forEach($location.search(), function(value, key) {
        $location.search(key, null);
      });

      return discoveryContext.executeSearch();
    };

    discoveryContext.resetSearch = function() {
      discoveryContext.clearCommon();

      return discoveryContext.executeSearch();
    };

    discoveryContext.executeSearch = function(maintainPage) {
      return $q(function(resolve) {
        if (!searching) {
          searching = true;

          if (!maintainPage) {
            discoveryContext.search.start = 0;
            discoveryContext.search.total = 0;
            discoveryContext.search.page.number = 0;
            $location.search("field", null);
            $location.search("value", null);
            $location.search("page", null);
            $location.search("sort", null);
            $location.search("size", null);
            $location.search("offset", null);
            $location.search("direction", null);
          }

          discoveryContext.reload().then(function() {
            searching = false;
            $location.search("field", discoveryContext.search.field === "" ? null : discoveryContext.search.field);
            $location.search("value", discoveryContext.search.value === "" ? null : discoveryContext.search.value);
            $location.search("page", discoveryContext.search.page.number === 0 ? null : discoveryContext.search.page.number);
            $location.search("size", discoveryContext.search.page.size === defaultPageSize ? null : discoveryContext.search.page.size);
            $location.search("offset", discoveryContext.search.page.offset === 0 ? null : discoveryContext.search.page.offset);
            $location.search("direction", discoveryContext.search.page.direction === "" ? null : discoveryContext.search.page.direction);

            if (discoveryContext.search.page.sort) {
              $location.search("sort", discoveryContext.search.page.sort);
            }

            if (discoveryContext.search.filters) {
              angular.forEach(discoveryContext.buildUrlFilterKeyValues(), function(value, key) {
                $location.search(key, value);
              });
            }

            resolve();
          });
        } else {
          resolve();
        }
      });
    };

    discoveryContext.buildUrlFilterKeyValues = function() {
      var filtersByKey;

      if (discoveryContext.search.filters.length > 0) {
        filtersByKey = {};

        angular.forEach(discoveryContext.search.filters, function(filter) {
          var urlKey = "f." + filter.key;

          if (!angular.isDefined(filtersByKey[urlKey])) {
            filtersByKey[urlKey] = [];
          }

          filtersByKey[urlKey].push(filter.value);
        });
      }

      return filtersByKey;
    };

    discoveryContext.isSearching = function() {
      return searching;
    };

    discoveryContext.buildPage = function() {
      var page = {
        number: 0,
        size: defaultPageSize,
        offset: 0
      };
      var number;

      if ($routeParams.page) {
        number = Number($routeParams.page);
        if (!isNaN(number)) {
          page.number = number;
        }
      }

      if ($routeParams.size) {
        number = Number($routeParams.size);
        if (!isNaN(number)) {
          page.size = number;
        }
      }

      if ($routeParams.offset) {
        number = Number($routeParams.offset);
        if (!isNaN(number)) {
          page.offset = number;
        }
      }

      if ($routeParams.sort) {
        page.sort = $routeParams.sort;
      }

      if ($routeParams.direction) {
        page.direction = $routeParams.direction;
      } else if (defaultDirection) {
        page.direction = defaultDirection;
      }

      return page;
    };

    discoveryContext.getBreadcrumb = function() {
      return {
        label: discoveryContext.name,
        path: "discovery-context/" + discoveryContext.slug
      };
    };

    discoveryContext.getSortedActiveFilters = function() {
      var sortedFilters = [];
      angular.forEach(sortedActiveFilterKeys, function(filterKey) {
        sortedFilters.push(getFilterByKey(filterKey));
      });
      return sortedFilters;
    };

    var addSortedActiveFilterKey = function(filterKey, value) {
      sortedActiveFilterKeys.push(hashSortedActiveFilterKey(filterKey, value));
    };

    var removeSortedActiveFilterKey = function(filter) {
      sortedActiveFilterKeys.splice(sortedActiveFilterKeys.indexOf(hashSortedActiveFilterKey(filter.key, filter.value)),1);
    };

    var hasSortedActiveFilterKey = function(filterKey, value) {
      return sortedActiveFilterKeys.indexOf(hashSortedActiveFilterKey(filterKey, value)) > -1;
    };

    var hashSortedActiveFilterKey = function(filterKey, value) {
      return window.btoa(encodeURIComponent(filterKey+value));
    };

    var getFilterByKey = function(filterKey) {
      var filterMatch = {};
      for (var x=0;x<discoveryContext.search.filters.length;x++) {
        var filter = discoveryContext.search.filters[x];
        if (hashSortedActiveFilterKey(filter.key, filter.value) === filterKey) {
          filterMatch = filter;
          break;
        }
      }
      return filterMatch;
    };

    return this;
  };
});
