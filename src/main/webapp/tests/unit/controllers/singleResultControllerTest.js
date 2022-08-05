describe("controller: SingleResultController", function () {
  var $q, $scope, MockedDiscoveryContext, MockedSingleResultContext, MockedUser, WsApi, controller;

  var initializeVariables = function () {
    inject(function (_$q_, _WsApi_) {
      $q = _$q_;

      MockedUser = new mockUser($q);
      MockedDiscoveryContext = new mockDiscoveryContext($q);
      MockedSingleResultContext = new mockSingleResultContext($q);

      WsApi = _WsApi_;
    });
  };

  var initializeController = function (settings) {
    inject(function (_$controller_, _$rootScope_, _DiscoveryContext_, _SingleResultContext_, _UserService_) {
      $scope = _$rootScope_.$new();

      sessionStorage.role = settings && settings.role ? settings.role : "ROLE_ADMIN";
      sessionStorage.token = settings && settings.token ? settings.token : "faketoken";

      controller = _$controller_("SingleResultController", {
        $q: $q,
        $scope: $scope,
        DiscoveryContext: _DiscoveryContext_,
        SingleResultContext: _SingleResultContext_,
        UserService: _UserService_,
        WsApi: WsApi
      });

      // ensure that the isReady() is called.
      if (!$scope.$$phase) {
        $scope.$digest();
      }
    });
  };

  beforeEach(function () {
    module("core");
    module("sage");
    module("templates");
    module("mock.discoveryContext", function ($provide) {
      var DiscoveryContext = function () {
        return MockedDiscoveryContext;
      };
      $provide.value("DiscoveryContext", DiscoveryContext);
    });
    module("mock.singleResultContext", function ($provide) {
      var SingleResultContext = function () {
        return MockedSingleResultContext;
      };
      $provide.value("SingleResultContext", SingleResultContext);
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

  afterEach(function () {
    $scope.$destroy();
  });

  describe("Is the controller", function () {
    var roles = [ "ROLE_ADMIN", "ROLE_MANAGER", "ROLE_USER", "ROLE_ANONYMOUS" ];

    var controllerExists = function (setting) {
      return function() {
        initializeController(setting);
        expect(controller).toBeDefined();
      };
    };

    for (var i in roles) {
      it("defined for " + roles[i], controllerExists({ role: roles[i] }));
    }
  });

});
