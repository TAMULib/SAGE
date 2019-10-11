describe("controller: DiscoveryContextController", function () {
  var $location, $q, $scope, DiscoveryContext, MockedDiscoveryContext, MockedUser, WsApi, appConfig, controller, routeParams;

  var initializeVariables = function() {
    inject(function (_$location_, _$q_, _WsApi_) {
      $location = _$location_;
      $q = _$q_;

      MockedDiscoveryContext = new mockDiscoveryContext($q);
      MockedUser = new mockUser($q);
      WsApi = _WsApi_;

      appConfig = { defaultThumbnailURI: "thumbnail.png" };
      routeParams = {};
    });
  };

  var initializeController = function(settings) {
    inject(function (_$controller_, _$rootScope_) {
      $scope = _$rootScope_.$new();

      sessionStorage.role = settings && settings.role ? settings.role : "ROLE_ADMIN";
      sessionStorage.token = settings && settings.token ? settings.token : "faketoken";
      routeParams = settings && settings.routeParams ? settings.routeParams : {};

      if (settings) {
        if (settings.appConfig) {
          appConfig = settings.appConfig;
        }

        if (settings.routeParams) {
          angular.extend(routeParams, settings.routeParams);
        }
      }

      controller = _$controller_("DiscoveryContextController", {
        $location: $location,
        $q: $q,
        $routeParams: routeParams,
        $scope: $scope,
        appConfig: appConfig,
        DiscoveryContext: DiscoveryContext,
        WsApi: WsApi
      });

      // ensure that the isReady() is called.
      if (!$scope.$$phase) {
        $scope.$digest();
      }
    });
  };

  beforeEach(function() {
    module("core", function($provide) {
      routeParams = {};
      $provide.value("$routeParams", routeParams);
    });
    module("sage");
    module("mock.discoveryContext", function($provide) {
      DiscoveryContext = function() {
        return MockedDiscoveryContext;
      };
      $provide.value("DiscoveryContext", DiscoveryContext);
    });
    module("mock.user", function($provide) {
      var User = function() {
        return MockedUser;
      };
      $provide.value("User", User);
    });
    module("mock.userService");
    module("mock.wsApi");

    installPromiseMatchers();
    initializeVariables();
    initializeController();
  });

  describe("Is the controller defined", function () {
    it("should be defined for admin", function () {
      expect(controller).toBeDefined();
    });

    it("should be defined for manager", function () {
      initializeController({role: "ROLE_MANAGER"});
      expect(controller).toBeDefined();
    });

    it("should be defined for user", function () {
      initializeController({role: "ROLE_USER"});
      expect(controller).toBeDefined();
    });

    it("should be defined for anonymous", function () {
      initializeController({role: "ROLE_ANONYMOUS"});
      expect(controller).toBeDefined();
    });
  });

  describe("Are the scope methods defined", function () {
    it("findSearchFieldLabel should be defined", function () {
      expect($scope.findSearchFieldLabel).toBeDefined();
      expect(typeof $scope.findSearchFieldLabel).toEqual("function");
    });

    it("hasActiveFilters should be defined", function () {
      expect($scope.hasActiveFilters).toBeDefined();
      expect(typeof $scope.hasActiveFilters).toEqual("function");
    });

    it("hasSearch should be defined", function () {
      expect($scope.hasSearch).toBeDefined();
      expect(typeof $scope.hasSearch).toEqual("function");
    });

    it("pageBack should be defined", function () {
      expect($scope.pageBack).toBeDefined();
      expect(typeof $scope.pageBack).toEqual("function");
    });

    it("pageForward should be defined", function () {
      expect($scope.pageForward).toBeDefined();
      expect(typeof $scope.pageForward).toEqual("function");
    });

    it("removeFilter should be defined", function () {
      expect($scope.removeFilter).toBeDefined();
      expect(typeof $scope.removeFilter).toEqual("function");
    });

    it("prepareSearch should be defined", function () {
      expect($scope.prepareSearch).toBeDefined();
      expect(typeof $scope.prepareSearch).toEqual("function");
    });

    it("resetBadges should be defined", function () {
      expect($scope.resetBadges).toBeDefined();
      expect(typeof $scope.resetBadges).toEqual("function");
    });

    it("resetPage should be defined", function () {
      expect($scope.resetPage).toBeDefined();
      expect(typeof $scope.resetPage).toEqual("function");
    });

    it("resetSearch should be defined", function () {
      expect($scope.resetSearch).toBeDefined();
      expect(typeof $scope.resetSearch).toEqual("function");
    });

    it("searchProcessKeyPress should be defined", function () {
      expect($scope.searchProcessKeyPress).toBeDefined();
      expect(typeof $scope.searchProcessKeyPress).toEqual("function");
    });

    it("updateLimit should be defined", function () {
      expect($scope.updateLimit).toBeDefined();
      expect(typeof $scope.updateLimit).toEqual("function");
    });

    it("updateSort should be defined", function () {
      expect($scope.updateSort).toBeDefined();
      expect(typeof $scope.updateSort).toEqual("function");
    });
  });

  describe("Do the $scope methods work as expected", function () {
    it("findSearchFieldLabel should work", function () {
      var result;

      result = $scope.findSearchFieldLabel("should not be found");
      expect(result).toBe("");

      $scope.discoveryContext.searchFields = [ new mockSearchField($q), new mockSearchField($q) ];
      $scope.discoveryContext.searchFields[1].mock(dataSearchField2);

      result = $scope.findSearchFieldLabel($scope.discoveryContext.searchFields[1].key);
      expect(result).toBe($scope.discoveryContext.searchFields[1].label);
    });

    it("hasActiveFilters should work", function () {
      var result;

      result = $scope.hasActiveFilters();
      expect(result).toBe(false);

      // @todo: implement a mockFacetField and use that here.
      $scope.discoveryContext.search.filters = [ {} ];

      result = $scope.hasActiveFilters();
      expect(result).toBe(true);
    });

    it("hasSearch should work", function () {
      var result;

      result = $scope.hasSearch();
      expect(result).toBe(false);

      $scope.discoveryContext.search.value = "all_fields";
      result = $scope.hasSearch();
      expect(result).toBe(true);
    });

    it("pageBack should work", function () {
      var result;

      result = $scope.pageBack();
      // @todo
    });

    it("pageForward should work", function () {
      var result;

      result = $scope.pageForward();
      // @todo
    });

    it("removeFilter should work", function () {
      // @todo: implement a mockFacetField and use that here.
      var filter = {};
      $scope.discoveryContext.search.filters = [ filter ];
      $scope.removeFilter(filter);
      $scope.$digest();
      // @todo
    });

    it("resetBadges should work", function () {
      $scope.discoveryContext = new mockDiscoveryContext($q);

      spyOn($scope, 'prepareSearch');

      $scope.resetBadges();
      $scope.$digest();

      expect($scope.prepareSearch).toHaveBeenCalled();
    });

    it("resetPage should work", function () {
      $scope.discoveryContext = new mockDiscoveryContext($q);

      spyOn($scope, 'prepareSearch');

      $scope.resetPage();
      $scope.$digest();

      expect($scope.prepareSearch).toHaveBeenCalled();
    });

    it("resetSearch should work", function () {
      $scope.discoveryContext = new mockDiscoveryContext($q);

      spyOn($scope, 'prepareSearch');

      $scope.resetSearch();
      $scope.$digest();

      expect($scope.prepareSearch).toHaveBeenCalled();
    });

    it("prepareSearch should work", function () {
      var result;

      result = $scope.prepareSearch();
      $scope.$digest();
      // @todo
    });

    it("searchProcessKeyPress should work", function () {
      var result;
      var event = {
          which: 13,
          target: {
              blur: function() {}
          }
      };

      result = $scope.searchProcessKeyPress(event);
      // @todo
    });

    it("updateLimit should work", function () {
      var result;

      result = $scope.updateLimit();
      $scope.$digest();
      // @todo
    });

    it("updateSort should work", function () {
      var result;

      result = $scope.updateSort();
      $scope.$digest();
      // @todo
    });
  });
});
