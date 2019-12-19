describe("controller: UsersController", function () {
  var $injector, $location, $q, $route, $scope, MockedUser, WsApi, controller;

  var initializeVariables = function () {
    inject(function (_$injector_, _$location_, _$q_, _$route_, _WsApi_) {
      $injector = _$injector_;
      $location = _$location_;
      $route = _$route_;
      $q = _$q_;

      MockedUser = new mockUser($q);

      WsApi = _WsApi_;
    });
  };

  var initializeController = function (settings) {
    inject(function (_$controller_, _$location_, _$rootScope_, _StorageService_, _UserService_) {
      $scope = _$rootScope_.$new();

      sessionStorage.role = settings && settings.role ? settings.role : "ROLE_ADMIN";
      sessionStorage.token = settings && settings.token ? settings.token : "faketoken";

      controller = _$controller_("UsersController", {
        $injector: $injector,
        $location: $location,
        $route: $route,
        $scope: $scope,
        StorageService: _StorageService_,
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
    module("mock.storageService");
    module("mock.user", function ($provide) {
      var User = function () {
        return MockedUser;
      };
      $provide.value("User", User);
    });
    module("mock.userService");
    module("mock.storageService");
    module("mock.wsApi");

    installPromiseMatchers();
    initializeVariables();
    initializeController();
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

  describe("Is the scope method", function () {
    var methods = [
      "assignableRoles",
      "canDelete",
      "delete",
      "updateRole"
    ];

    var scopeMethodExists = function (method) {
      return function() {
        expect($scope[method]).toBeDefined();
        expect(typeof $scope[method]).toEqual("function");
      };
    };

    for (var i in methods) {
      it(methods[i] + " defined", scopeMethodExists(methods[i]));
    }
  });

  describe("Does the $scope method", function () {
    it("assignableRoles work as expected", function () {
      var result;

      result = $scope.assignableRoles("ROLE_ADMIN");
      // @todo

      result = $scope.assignableRoles("ROLE_USER");
      // @todo

      result = $scope.assignableRoles("ROLE_ANONYMOUS");
      // @todo

      result = $scope.assignableRoles("Should not exist");
      // @todo
    });

    it("canDelete work as expected", function () {
      var user = new mockUser($q);
      var result;

      result = $scope.canDelete(user);
      // @todo
    });

    it("delete work as expected", function () {
      var user = new mockUser($q);
      var result;

      result = $scope.delete(user);
      // @todo
    });

    it("updateRole work as expected", function () {
      var user = new mockUser($q);
      var result;

      result = $scope.updateRole(user);
      // @todo
    });
  });

});
