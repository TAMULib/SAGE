describe("controller: AppLoginController", function () {
  var $q, $scope, MockedUser, WsApi, controller;

  var initializeVariables = function () {
    inject(function (_$q_, _WsApi_) {
      $q = _$q_;

      MockedUser = new mockUser($q);
      WsApi = _WsApi_;
    });
  };

  var initializeController = function (settings) {
    inject(function (_$controller_, _$rootScope_, _UserService_) {
      $scope = _$rootScope_.$new();

      sessionStorage.role = settings && settings.role ? settings.role : "ROLE_ADMIN";
      sessionStorage.token = settings && settings.token ? settings.token : "faketoken";

      controller = _$controller_("AppLoginController", {
        $scope: $scope,
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
      "checkAuthStrategy",
      "isEmailEnabled",
      "isExternalEnabled"
    ];

    for (var i in methods) {
      it(methods[i] + " defined", function () {
        expect($scope[methods[i]]).toBeDefined();
        expect(typeof $scope[methods[i]]).toEqual("function");
      });
    }
  });

  describe("Does the $scope methods", function () {
    it("checkAuthStrategy work as expected", function () {
      var result;

      result = $scope.checkAuthStrategy("emailRegistration");
      // @todo

      result = $scope.checkAuthStrategy("Should Not Exist");
      // @todo
    });

    it("isEmailEnabled work as expected", function () {
      var result;

      result = $scope.isEmailEnabled();
      // @todo
    });

    it("isExternalEnabled work as expected", function () {
      var result;

      result = $scope.isExternalEnabled();
      // @todo
    });
  });

});
