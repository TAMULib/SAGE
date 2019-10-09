sage.model("DiscoveryContext", function ($q, $location, $routeParams, WsApi, Result, Field, Search) {
  return function DiscoveryContext() {

    var model = this;
    var searching;
    var defaultPageSize = 10;
    var defaultPageSort = "id"; // @fixme: needs to be determined from DiscoveryView.

    var fetchContext = function () {
      var parameters = {
        pathValues: {
          slug: model.slug
        },
        query: {
          field: angular.isDefined(model.search.field) ? model.search.field : "",
          value: angular.isDefined(model.search.value) ? model.search.value : "",
          sort: angular.isDefined(model.search.page.sort) ? model.search.page.sort : defaultPageSort,
          page: angular.isDefined(model.search.page.number) ? model.search.page.number : 0,
          size: angular.isDefined(model.search.page.size) ? model.search.page.size : defaultPageSize,
          offset: angular.isDefined(model.search.page.offset) ? model.search.page.offset : 0
        }
      };

      angular.forEach(model.search.filters, function(filter) {
        var filterKey = "f." + filter.key;
        if (!angular.isDefined(parameters.query[filterKey])) {
          parameters.query[filterKey] = [];
        }
        parameters.query[filterKey].push(filter.value);
      });

      return WsApi.fetch(model.getMapping().load, parameters);
    };

    var populateProperty = function(pname, ctor) {
      for (var i in model[pname]) {
        model[pname][i] = new ctor(model[pname][i]);
      }
    };

    model.before(function () {
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

      model.search = new Search({
        field: angular.isDefined($routeParams.field) ? $routeParams.field : "",
        value: angular.isDefined($routeParams.value) ? $routeParams.value : "",
        label: "",
        filters: filters,
        start: 0,
        total: 0,
        page: model.buildPage()
      });

      return model.reload();
    });

    model.reload = function() {
      var defer = $q.defer();

      fetchContext().then(function (res) {
        var payload = angular.fromJson(res.body).payload.DiscoveryContext;
        var search = payload.search;

        // do not override local search settings, only these search properties are needed.
        var page = Number(search.page);
        if (!isNaN(page)) {
          model.search.page.number = page;
          $location.search("page", model.search.page.number);
        }

        model.search.field = search.field;
        model.search.label = search.label;
        model.search.value = search.value;
        model.search.filters = search.filters ? search.filters : [];
        model.search.start = search.start;
        model.search.total = search.total;
        delete payload.search;

        angular.extend(model, payload);

        populateProperty("results", Result);
        populateProperty("fields", Field);

        defer.resolve(model);
      });

      return defer.promise;
    };

    model.setSearchField = function(key, value, label) {
      model.search.field = key;
      model.search.value = value;
      model.search.label = label;
    };

    model.addFilter = function(label, key, value) {
      var filter = {
        label: label,
        key: key,
        value: value
      };

      if (!model.search.filters) {
        model.search.filters = [];
      }

      model.search.filters.push(filter);

      var urlKey = "f." + filter.key;
      var existingValues = model.buildUrlFilterKeyValues();

      $location.search(urlKey, existingValues[urlKey]);
      return model.executeSearch();
    };

    model.removeFilter = function(filter) {
      for (var i = 0; i < model.search.filters.length; i++) {
        var f = model.search.filters[i];
        if (f.key === filter.key && f.value === filter.value) {
          model.search.filters.splice(i, 1);

          var urlKey = "f." + filter.key;
          var existingValues = model.buildUrlFilterKeyValues();

          if (existingValues && angular.isDefined(existingValues[urlKey])) {
            $location.search(urlKey, existingValues[urlKey]);
          } else {
            $location.search(urlKey, null);
          }

          break;
        }
      }

      return model.executeSearch();
    };

    model.clearCommon = function() {
      model.search.filters.length = 0;
      model.search.field = "";
      model.search.value = "";
      model.search.label = "";

      $location.search("field", null);
      $location.search("value", null);
    };

    model.resetPage = function() {
      model.search.filters.length = 0;
      model.clearCommon();

      angular.forEach($location.search(), function(value, key) {
        $location.search(key, null);
      });

      return model.executeSearch();
    };

    model.resetBadges = function() {
      model.search.filters.length = 0;
      model.clearCommon();

      angular.forEach($location.search(), function(value, key) {
        if (key.match(/^f\./i)) $location.search(key, null);
      });

      return model.executeSearch();
    };

    model.resetSearch = function() {
      model.clearCommon();

      $location.search("field", null);
      $location.search("value", null);

      return model.executeSearch();
    };

    model.executeSearch = function(maintainPage) {
      return $q(function(resolve) {
        if (!searching) {
          searching = true;

          if (!maintainPage) {
            model.search.start = 0;
            model.search.total = 0;
            model.search.page.number = 0;
            $location.search("field", null);
            $location.search("value", null);
            $location.search("page", null);
            $location.search("sort", null);
            $location.search("size", null);
            $location.search("offset", null);
          }

          model.reload().then(function() {
            searching = false;
            $location.search("field", model.search.field === "" ? null : model.search.field);
            $location.search("value", model.search.value === "" ? null : model.search.value);
            $location.search("page", model.search.page.number === 0 ? null : model.search.page.number);
            $location.search("sort", model.search.page.sort === defaultPageSort ? null : model.search.page.sort);
            $location.search("size", model.search.page.size === defaultPageSize ? null : model.search.page.size);
            $location.search("offset", model.search.page.offset === 0 ? null : model.search.page.offset);

            if (model.search.filters) {
              angular.forEach(model.buildUrlFilterKeyValues(), function(value, key) {
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

    model.buildUrlFilterKeyValues = function() {
      var filtersByKey;

      if (model.search.filters.length > 0) {
        filtersByKey = {};

        angular.forEach(model.search.filters, function(filter) {
          var urlKey = "f." + filter.key;

          if (!angular.isDefined(filtersByKey[urlKey])) {
            filtersByKey[urlKey] = [];
          }

          filtersByKey[urlKey].push(filter.value);
        });
      }

      return filtersByKey;
    };

    model.isSearching = function() {
      return searching;
    };

    model.buildPage = function() {
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

    model.getBreadcrumb = function() {
      return {
        label: model.name,
        path: "discovery-context/" + model.slug
      };
    };

    return this;
  };
});
