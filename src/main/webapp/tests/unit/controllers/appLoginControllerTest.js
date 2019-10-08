describe("controller: AppLoginController", function () {
  var controller, q, scope, MockedUser, WsApi;

  var initializeVariables = function(settings) {
    inject(function ($q, _WsApi_) {
      q = $q;

      MockedUser = new mockUser(q);
      WsApi = _WsApi_;
    });
  };

  var initializeController = function(settings) {
    inject(function ($controller, $rootScope, _UserService_) {
      scope = $rootScope.$new();

      sessionStorage.role = settings && settings.role ? settings.role : "ROLE_ADMIN";
      sessionStorage.token = settings && settings.token ? settings.token : "faketoken";

      controller = $controller("AppLoginController", {
        $scope: scope,
        UserService: _UserService_,
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
    it("checkAuthStrategy should be defined", function () {
      expect(scope.checkAuthStrategy).toBeDefined();
      expect(typeof scope.checkAuthStrategy).toEqual("function");
    });

    it("isEmailEnabled should be defined", function () {
      expect(scope.isEmailEnabled).toBeDefined();
      expect(typeof scope.isEmailEnabled).toEqual("function");
    });

    it("isExternalEnabled should be defined", function () {
      expect(scope.isExternalEnabled).toBeDefined();
      expect(typeof scope.isExternalEnabled).toEqual("function");
    });
  });

  describe("Do the scope methods work as expected", function () {
    it("checkAuthStrategy should work", function () {
      var result;

      result = scope.checkAuthStrategy("emailRegistration");
      // @todo

      result = scope.checkAuthStrategy("Should Not Exist");
      // @todo
    });

    it("isEmailEnabled should work", function () {
      var result;

      result = scope.isEmailEnabled();
      // @todo
    });

    it("isExternalEnabled should work", function () {
      var result;

      result = scope.isExternalEnabled();
      // @todo
    });
  });

});
