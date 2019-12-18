describe("model: DiscoveryContext", function () {
  var $rootScope, $scope, $location, WsApi, routeParams, model, wsResponse;

  var initializeVariables = function (settings) {
    inject(function (_$q_, _$location_, _$rootScope_, _WsApi_) {
      $location = _$location_;
      $q = _$q_;
      $rootScope = _$rootScope_;

      if (settings && settings.routeParams) {
        angular.extend(routeParams, settings.routeParams);
      }

      WsApi = _WsApi_;

      wsResponse = {
        type: "payload",
        payload: {
          DiscoveryContext: {
            search: {
              field: "",
              value: "",
              page: {
                sort: "id",
                number: 0,
                size: 10,
                offset: 0
              }
            }
          }
        }
      };

      WsApi.mockFetchResponse(wsResponse);
    });
  };

  var initializeModel = function (settings) {
    inject(function (_DiscoveryContext_) {
      $scope = $rootScope.$new();

      if (settings) {
        if (settings.routeParams) {
          angular.extend(routeParams, settings.routeParams);
        }
      }

      model = angular.extend(new _DiscoveryContext_(), dataDiscoveryContext1);

      // ensure that all pre-processing is called.
      if (!$scope.$$phase) {
        $scope.$digest();
      }
    });
  };

  beforeEach(function () {
    module("core", function ($provide) {
      routeParams = {};
      $provide.value("$routeParams", routeParams);
    });
    module("sage");
    module("mock.filter");
    module("mock.wsApi");

    initializeVariables();
    initializeModel();
  });

  describe("Is the model defined", function () {
    it("should be defined", function () {
      expect(model).toBeDefined();
    });
  });

  describe("Are the model methods defined", function () {
    it("addFilter should be defined", function () {
      expect(model.addFilter).toBeDefined();
      expect(typeof model.addFilter).toEqual("function");
    });

    it("buildPage should be defined", function () {
      expect(model.buildPage).toBeDefined();
      expect(typeof model.buildPage).toEqual("function");
    });

    it("buildUrlFilterKeyValues should be defined", function () {
      expect(model.buildUrlFilterKeyValues).toBeDefined();
      expect(typeof model.buildUrlFilterKeyValues).toEqual("function");
    });

    it("executeSearch should be defined", function () {
      expect(model.executeSearch).toBeDefined();
      expect(typeof model.executeSearch).toEqual("function");
    });

    it("getBreadcrumb should be defined", function () {
      expect(model.getBreadcrumb).toBeDefined();
      expect(typeof model.getBreadcrumb).toEqual("function");
    });

    it("isSearching should be defined", function () {
      expect(model.isSearching).toBeDefined();
      expect(typeof model.isSearching).toEqual("function");
    });

    it("reload should be defined", function () {
      expect(model.reload).toBeDefined();
      expect(typeof model.reload).toEqual("function");
    });

    it("removeFilter should be defined", function () {
      expect(model.removeFilter).toBeDefined();
      expect(typeof model.removeFilter).toEqual("function");
    });

    it("resetBadges should be defined", function () {
      expect(model.resetBadges).toBeDefined();
      expect(typeof model.resetBadges).toEqual("function");
    });

    it("resetSearch should be defined", function () {
      expect(model.resetSearch).toBeDefined();
      expect(typeof model.resetSearch).toEqual("function");
    });

    it("setSearchField should be defined", function () {
      expect(model.setSearchField).toBeDefined();
      expect(typeof model.setSearchField).toEqual("function");
    });
  });

  describe("Are the model methods working as expected", function () {
    it("addFilter should work", function () {
      var mockFilter1 = new mockFilter($q);
      var mockFilter2 = new mockFilter($q);
      var mockFilter3 = new mockFilter($q);
      mockFilter2.mock(dataFilter2);
      mockFilter3.mock(dataFilter3);

      spyOn(model, "executeSearch");
      delete model.search.filters;

      model.addFilter(mockFilter1.label, mockFilter1.key, mockFilter1.value);
      $scope.$digest();

      expect(model.search.filters.length).toBe(1);
      expect(model.executeSearch).toHaveBeenCalled();

      model.addFilter(mockFilter2.label, mockFilter2.key, mockFilter2.value);
      $scope.$digest();
      expect(model.search.filters.length).toBe(2);

      model.addFilter(mockFilter3.label, mockFilter3.key, mockFilter3.value);
      $scope.$digest();
      expect(model.search.filters.length).toBe(3);
    });

    it("buildPage should work", function () {
      var page;

      page = model.buildPage();

      expect(page.number).toBe(0);
      expect(page.size).toBe(10);
      expect(page.sort).toBe("id");
      expect(page.offset).toBe(0);

      var settings = {
        routeParams: {
          page: 1,
          size: 20,
          offset: 3,
          sort: "timestamp"
        }
      };

      initializeModel(settings);

      page = model.buildPage();
      expect(page.number).toBe(settings.routeParams.page);
      expect(page.size).toBe(settings.routeParams.size);
      expect(page.sort).toBe(settings.routeParams.sort);
      expect(page.offset).toBe(settings.routeParams.offset);
    });

    it("buildUrlFilterKeyValues should work", function () {
      var urlFilters;
      var mockFilter1 = new mockFilter($q);
      var mockFilter2 = new mockFilter($q);
      var mockFilter3 = new mockFilter($q);
      mockFilter2.mock(dataFilter2);
      mockFilter3.mock(dataFilter3);

      model.search.filters = [];

      urlFilters = model.buildUrlFilterKeyValues();
      expect(urlFilters).not.toBeDefined();

      model.search.filters.push(mockFilter1);
      urlFilters = model.buildUrlFilterKeyValues();
      expect(urlFilters["f." + mockFilter1.key]).toBeDefined();
      expect(urlFilters["f." + mockFilter1.key].length).toBe(1);

      model.search.filters.push(mockFilter2);
      urlFilters = model.buildUrlFilterKeyValues();
      expect(urlFilters["f." + mockFilter2.key]).toBeDefined();
      expect(urlFilters["f." + mockFilter2.key].length).toBe(1);

      // mockFilter3 should have same key as mockFilter1.
      model.search.filters.push(mockFilter3);
      urlFilters = model.buildUrlFilterKeyValues();
      expect(urlFilters["f." + mockFilter3.key]).toBeDefined();
      expect(urlFilters["f." + mockFilter1.key].length).toBe(2);
    });

    it("executeSearch should work", function () {
      var originalSearch = $location.search;
      spyOn($location, "search").and.callThrough();

      model.executeSearch(false);
      $scope.$digest();

      expect($location.search).toHaveBeenCalled();

      wsResponse.payload.DiscoveryContext.search.field = "mockField";
      wsResponse.payload.DiscoveryContext.search.value = "mockValue";
      wsResponse.payload.DiscoveryContext.search.page.number = 1;
      wsResponse.payload.DiscoveryContext.search.page.sort = "id";
      wsResponse.payload.DiscoveryContext.search.page.size = -1;
      wsResponse.payload.DiscoveryContext.search.page.offset = -1;
      wsResponse.payload.DiscoveryContext.search.filters = [ "f.mock1", "f.mock2" ];
      $location.search = originalSearch;
      spyOn($location, "search").and.callThrough();

      model.executeSearch(true);
      $scope.$digest();

      expect($location.search).toHaveBeenCalled();

      // searching cannot be directly assigned, but it gets assigned when executeSearch() is called.
      // because $digest() has likely not yet happened, the second call will likely trigger the "!searching" case.
      model.executeSearch();
      model.executeSearch();
      $scope.$digest();
    });

    it("getBreadcrumb should work", function () {
      var result;

      result = model.getBreadcrumb();
      expect(result.label).toBe(model.name);
    });

    it("isSearching should work", function () {
      model.executeSearch();
      expect(model.isSearching()).toBe(true);
      $scope.$digest();

      expect(model.isSearching()).toBe(false);
    });

    it("reload should work", function () {
      wsResponse.payload.DiscoveryContext.search.field = "mock";
      wsResponse.payload.DiscoveryContext.search.filters = {
        "f.mock1": "value1",
        "f.mock2": "value2",
      };

      model.reload();
      $scope.$digest();
      expect(model.search.field).toBe("mock");

      wsResponse.payload.DiscoveryContext.search.page = 1;
      model.reload();
      $scope.$digest();

      expect(model.search.page.number).toBe(1);
    });

    it("removeFilter should work", function () {
      var mockFilter1 = new mockFilter($q);
      var mockFilter2 = new mockFilter($q);
      var mockFilter3 = new mockFilter($q);
      mockFilter2.mock(dataFilter2);
      mockFilter3.mock(dataFilter3);

      spyOn(model, "executeSearch");
      model.search.filters = [ mockFilter1, mockFilter2, mockFilter3 ];

      model.removeFilter(mockFilter2);
      $scope.$digest();

      expect(model.search.filters.length).toBe(2);
      expect(model.executeSearch).toHaveBeenCalled();

      model.removeFilter(mockFilter1);
      $scope.$digest();
      expect(model.search.filters.length).toBe(1);

      model.removeFilter(mockFilter3);
      $scope.$digest();
      expect(model.search.filters.length).toBe(0);
    });

    it("resetBadges should work", function () {
      var mockFilter1 = new mockFilter($q);
      var mockFilter2 = new mockFilter($q);
      mockFilter2.mock(dataFilter2);

      spyOn(model, "executeSearch");
      model.search.filters = [ mockFilter1, mockFilter2 ];
      $location.search("f.mock", "mockedValue");

      model.resetBadges();
      $scope.$digest();

      expect(model.search.filters.length).toBe(0);
      expect(model.executeSearch).toHaveBeenCalled();
    });

    it("resetSearch should work", function () {
      spyOn(model, "executeSearch");
      model.search.field = "mock_field";
      model.search.value = "mockedValue";
      $location.search("field", model.search.field);
      $location.search("value", model.search.value);

      model.resetSearch();
      $scope.$digest();

      expect(model.search.field).toBe("");
      expect(model.search.value).toBe("");
      expect(model.executeSearch).toHaveBeenCalled();
    });

    it("setSearchField should work", function () {
      var searchField = new mockSearchField($q);
      model.search.field = "";
      model.search.value = "";

      model.setSearchField(searchField.key, searchField.value);

      expect(model.search.field).toBe(searchField.key);
      expect(model.search.value).toBe(searchField.value);
    });
  });

  describe("Does the $scope initialize as expected", function () {
    it("EmailTemplateRepo.before() should work", function () {
      var settings = {
        routeParams: {
          field: "mockField",
          value: "mock value",
          page: 1,
          size: 20,
          offset: 3,
          sort: "timestamp",
          "f.mockFilter": "mock filter value"
        }
      };

      initializeModel(settings);

      // @todo
      /*
      expect(model.search.field).toBe(settings.routeParams.field);
      expect(model.search.value).toBe(settings.routeParams.value);
      expect(model.search.page).toBe(settings.routeParams.page);
      expect(model.search.filters.length).toBe(1);
      expect(model.search.filters[0].key).toBe("mockFilter");
      expect(model.search.filters[0].vale).toBe(settings.routeParams.filters["f.mockFilter"].value);
      */
    });
  });
});
