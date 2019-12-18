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
    it("assignableRoles should be defined", function () {
      expect($scope.assignableRoles).toBeDefined();
      expect(typeof $scope.assignableRoles).toEqual("function");
    });
    it("canDelete should be defined", function () {
      expect($scope.canDelete).toBeDefined();
      expect(typeof $scope.canDelete).toEqual("function");
    });
    it("delete should be defined", function () {
      expect($scope.delete).toBeDefined();
      expect(typeof $scope.delete).toEqual("function");
    });
    it("updateRole should be defined", function () {
      expect($scope.updateRole).toBeDefined();
      expect(typeof $scope.updateRole).toEqual("function");
    });
  });

  describe("Do the $scope methods work as expected", function () {
    it("assignableRoles should work", function () {
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
    it("canDelete should work", function () {
      var user = new mockUser($q);
      var result;

      result = $scope.canDelete(user);
      // @todo
    });
    it("delete should work", function () {
      var user = new mockUser($q);
      var result;

      result = $scope.delete(user);
      // @todo
    });
    it("updateRole should work", function () {
      var user = new mockUser($q);
      var result;

      result = $scope.updateRole(user);
      // @todo
    });
  });

});
