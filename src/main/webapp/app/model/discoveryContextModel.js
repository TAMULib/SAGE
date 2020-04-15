sage.model("DiscoveryContext", function ($q, $location, $routeParams, Field, ManifestService, Result, Search, WsApi) {
  return function DiscoveryContext() {

    var discoveryContext = this;
    var searching;
    var defaultPageSize = 10;
    var defaultPageSort = "id"; // @fixme: needs to be determined from DiscoveryView.

    var fetchContext = function () {
      var parameters = {
        pathValues: {
          slug: discoveryContext.slug
        },
        query: {
          field: angular.isDefined(discoveryContext.search.field) ? discoveryContext.search.field : "",
          value: angular.isDefined(discoveryContext.search.value) ? discoveryContext.search.value : "",
          sort: angular.isDefined(discoveryContext.search.page.sort) ? discoveryContext.search.page.sort : defaultPageSort,
          page: angular.isDefined(discoveryContext.search.page.number) ? discoveryContext.search.page.number : 0,
          size: angular.isDefined(discoveryContext.search.page.size) ? discoveryContext.search.page.size : defaultPageSize,
          offset: angular.isDefined(discoveryContext.search.page.offset) ? discoveryContext.search.page.offset : 0
        }
      };

      angular.forEach(discoveryContext.search.filters, function(filter) {
        var filterKey = "f." + filter.key;
        if (!angular.isDefined(parameters.query[filterKey])) {
          parameters.query[filterKey] = [];
        }
        //the service uses the fv:: prefix to understand and process multiple values for the same filter key
        parameters.query[filterKey].push(encodeURIComponent("fv::"+filter.value));
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

      angular.forEach($routeParams, function(value, key) {
        if (key.match(/^f\./i)) {
          var filter = {
            key: key.replace(/^f\./, ""),
            value: value
          };
          filters.push(filter);
        }
      });

      discoveryContext.search = new Search({
        field: angular.isDefined($routeParams.field) ? $routeParams.field : "",
        value: angular.isDefined($routeParams.value) ? $routeParams.value : "",
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
          if (!value.resourceThumbnailUriKey) {
            value.resourceThumbnailUriKey = 'temp';
            if (value.manifestUriKey) {
              ManifestService.getThumbnailUrl(value.manifestUriKey).then(function(thumbnailUrl) {
                value.resourceThumbnailUriKey = thumbnailUrl;
              }, function(error) {

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

      discoveryContext.search.filters.push(filter);

      var urlKey = "f." + filter.key;
      var existingValues = discoveryContext.buildUrlFilterKeyValues();

      $location.search(urlKey, existingValues[urlKey]);
      return discoveryContext.executeSearch();
    };

    discoveryContext.removeFilter = function(filter) {
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
      discoveryContext.search.page.sort = defaultPageSort;
      discoveryContext.search.page.offset = 0;

      angular.forEach($location.search(), function(value, key) {
        $location.search(key, null);
      });

      return discoveryContext.executeSearch();
    };

    discoveryContext.resetBadges = function() {
      discoveryContext.clearCommon();

      discoveryContext.search.filters.length = 0;

      angular.forEach($location.search(), function(value, key) {
        if (key.match(/^f\./i)) $location.search(key, null);
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
          }

          discoveryContext.reload().then(function() {
            searching = false;
            $location.search("field", discoveryContext.search.field === "" ? null : discoveryContext.search.field);
            $location.search("value", discoveryContext.search.value === "" ? null : discoveryContext.search.value);
            $location.search("page", discoveryContext.search.page.number === 0 ? null : discoveryContext.search.page.number);
            $location.search("sort", discoveryContext.search.page.sort === defaultPageSort ? null : discoveryContext.search.page.sort);
            $location.search("size", discoveryContext.search.page.size === defaultPageSize ? null : discoveryContext.search.page.size);
            $location.search("offset", discoveryContext.search.page.offset === 0 ? null : discoveryContext.search.page.offset);

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
        sort: defaultPageSort,
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

      return page;
    };

    discoveryContext.getBreadcrumb = function() {
      return {
        label: discoveryContext.name,
        path: "discovery-context/" + discoveryContext.slug
      };
    };

    return this;
  };
});
