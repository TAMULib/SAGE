describe("controller: DiscoveryContextController", function () {
  var controller, location, q, scope, appConfig, routeParams, MockedDiscoveryContext, WsApi;

  var initializeVariables = function(settings) {
    inject(function ($location, $q, $routeParams, _WsApi_) {
      location = $location;
      q = $q;

      routeParams = settings && settings.routeParams ? settings.routeParams : $routeParams;
      appConfig = settings && settings.appConfig ? settings.appConfig : { defaultThumbnailURI: "thumbnail.png" };

      MockedDiscoveryContext = new mockDiscoveryContext(q);
      DiscoveryContext = function() {
        return MockedDiscoveryContext;
      };

      WsApi = _WsApi_;
    });
  };

  var initializeController = function(settings) {
    inject(function ($controller, $rootScope) {
      scope = $rootScope.$new();

      sessionStorage.role = settings && settings.role ? settings.role : "ROLE_ADMIN";
      sessionStorage.token = settings && settings.token ? settings.token : "faketoken";

      if (settings) {
        if (settings.appConfig) {
          appConfig = settings.appConfig;
        }

        if (settings.routeParams) {
          routeParams = settings.routeParams;
        }
      }

      controller = $controller("DiscoveryContextController", {
        $location: location,
        $routeParams: routeParams,
        $scope: scope,
        appConfig: appConfig,
        DiscoveryContext: DiscoveryContext,
        WsApi: WsApi
      });

      // ensure that the isReady() is called.
      if (!scope.$$phase) {
        scope.$digest();
      }
    });
  };

  beforeEach(function() {
    module("core");
    module("sage");
    module("mock.discoveryContext");
    module("mock.user");
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
    it("clearFilters should be defined", function () {
      expect(scope.clearFilters).toBeDefined();
      expect(typeof scope.clearFilters).toEqual("function");
    });

    it("pageBack should be defined", function () {
      expect(scope.pageBack).toBeDefined();
      expect(typeof scope.pageBack).toEqual("function");
    });

    it("pageForward should be defined", function () {
      expect(scope.pageForward).toBeDefined();
      expect(typeof scope.pageForward).toEqual("function");
    });

    it("removeFilter should be defined", function () {
      expect(scope.removeFilter).toBeDefined();
      expect(typeof scope.removeFilter).toEqual("function");
    });

    it("resetSearch should be defined", function () {
      expect(scope.resetSearch).toBeDefined();
      expect(typeof scope.resetSearch).toEqual("function");
    });

    it("searchProcessKeyPress should be defined", function () {
      expect(scope.searchProcessKeyPress).toBeDefined();
      expect(typeof scope.searchProcessKeyPress).toEqual("function");
    });

    it("updateLimit should be defined", function () {
      expect(scope.updateLimit).toBeDefined();
      expect(typeof scope.updateLimit).toEqual("function");
    });

    it("updateSort should be defined", function () {
      expect(scope.updateSort).toBeDefined();
      expect(typeof scope.updateSort).toEqual("function");
    });
  });

  describe("Do the scope methods work as expected", function () {
    it("clearFilters should work", function () {
      var result;

      result = scope.clearFilters();
      // @todo
    });

    it("pageBack should work", function () {
      var result;

      result = scope.pageBack();
      // @todo
    });

    it("pageForward should work", function () {
      var result;

      result = scope.pageForward();
      // @todo
    });

    it("removeFilter should work", function () {
      var result;

      result = scope.removeFilter();
      // @todo
    });

    it("resetSearch should work", function () {
      var result;

      result = scope.resetSearch();
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

      result = scope.searchProcessKeyPress(event);
      // @todo
    });

    it("updateLimit should work", function () {
      var result;

      result = scope.updateLimit();
      // @todo
    });

    it("updateSort should work", function () {
      var result;

      result = scope.updateSort();
      // @todo
    });
  });
});
