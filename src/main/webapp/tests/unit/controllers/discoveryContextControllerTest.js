describe("controller: DiscoveryContextController", function () {
  var $location, $q, $scope, DiscoveryContext, MockedDiscoveryContext, MockedUser, WsApi, appConfig, controller, routeParams;

  var initializeVariables = function () {
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

  var initializeController = function (settings) {
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

  beforeEach(function () {
    module("core", function ($provide) {
      routeParams = {};
      $provide.value("$routeParams", routeParams);
    });
    module("sage");
    module("mock.discoveryContext", function ($provide) {
      DiscoveryContext = function () {
        return MockedDiscoveryContext;
      };
      $provide.value("DiscoveryContext", DiscoveryContext);
    });
    module("mock.user", function ($provide) {
      var User = function () {
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

  describe("Is the controller", function () {
    var roles = [ "ROLE_ADMIN", "ROLE_MANAGER", "ROLE_USER", "ROLE_ANONYMOUS" ];
    for (var i in roles) {
      it("defined for " + roles[i], function () {
        initializeController({ role: roles[i] });
        expect(controller).toBeDefined();
      });
    }
  });

  describe("Is the scope method", function () {
    var methods = [
      "findSearchFieldLabel",
      "hasActiveFilters",
      "hasSearch",
      "pageBack",
      "pageForward",
      "removeFilter",
      "prepareSearch",
      "resetBadges",
      "resetPage",
      "resetSearch",
      "searchProcessKeyPress",
      "updateLimit",
      "updateSort"
    ];

    for (var i in methods) {
      it(methods[i] + " defined", function () {
        expect($scope[methods[i]]).toBeDefined();
        expect(typeof $scope[methods[i]]).toEqual("function");
      });
    }
  });

  describe("Does the $scope method", function () {
    it("findSearchFieldLabel work as expected", function () {
      var result;

      result = $scope.findSearchFieldLabel("should not be found");
      expect(result).toBe("");

      $scope.discoveryContext.searchFields = [ new mockSearchField($q), new mockSearchField($q) ];
      $scope.discoveryContext.searchFields[1].mock(dataSearchField2);

      result = $scope.findSearchFieldLabel($scope.discoveryContext.searchFields[1].key);
      expect(result).toBe($scope.discoveryContext.searchFields[1].label);
    });

    it("hasActiveFilters work as expected", function () {
      var result;

      result = $scope.hasActiveFilters();
      expect(result).toBe(false);

      // @todo: implement a mockFacetField and use that here.
      $scope.discoveryContext.search.filters = [ {} ];

      result = $scope.hasActiveFilters();
      expect(result).toBe(true);
    });

    it("hasSearch work as expected", function () {
      var result;

      result = $scope.hasSearch();
      expect(result).toBe(false);

      $scope.discoveryContext.search.value = "all_fields";
      result = $scope.hasSearch();
      expect(result).toBe(true);
    });

    it("pageBack work as expected", function () {
      var result;

      result = $scope.pageBack();
      // @todo
    });

    it("pageForward work as expected", function () {
      var result;

      result = $scope.pageForward();
      // @todo
    });

    it("removeFilter work as expected", function () {
      // @todo: implement a mockFacetField and use that here.
      var filter = {};
      $scope.discoveryContext.search.filters = [ filter ];
      $scope.removeFilter(filter);
      $scope.$digest();
      // @todo
    });

    it("resetBadges work as expected", function () {
      $scope.discoveryContext = new mockDiscoveryContext($q);

      spyOn($scope, "prepareSearch");

      $scope.resetBadges();
      $scope.$digest();

      expect($scope.prepareSearch).toHaveBeenCalled();
    });

    it("resetPage work as expected", function () {
      $scope.discoveryContext = new mockDiscoveryContext($q);

      spyOn($scope, "prepareSearch");

      $scope.resetPage();
      $scope.$digest();

      expect($scope.prepareSearch).toHaveBeenCalled();
    });

    it("resetSearch work as expected", function () {
      $scope.discoveryContext = new mockDiscoveryContext($q);

      spyOn($scope, "prepareSearch");

      $scope.resetSearch();
      $scope.$digest();

      expect($scope.prepareSearch).toHaveBeenCalled();
    });

    it("prepareSearch work as expected", function () {
      var result;

      result = $scope.prepareSearch();
      $scope.$digest();
      // @todo
    });

    it("searchProcessKeyPress work as expected", function () {
      var result;
      var event = {
          which: 13,
          target: {
              blur: function () {}
          }
      };

      result = $scope.searchProcessKeyPress(event);
      // @todo
    });

    it("updateLimit work as expected", function () {
      var result;

      result = $scope.updateLimit();
      $scope.$digest();
      // @todo
    });

    it("updateSort work as expected", function () {
      var result;

      result = $scope.updateSort();
      $scope.$digest();
      // @todo
    });
  });
});
