describe("model: Source", function () {
  var $q, $rootScope, $scope, MockedUser, WsApi, model;

  var initializeVariables = function (settings) {
    inject(function (_$q_, _$rootScope_, _WsApi_) {
      $q = _$q_;
      $q = _$q_;
      $rootScope = _$rootScope_;

      MockedUser = new mockUser($q);
      WsApi = _WsApi_;
    });
  };

  var initializeModel = function (settings) {
    inject(function (_Source_) {
      $scope = $rootScope.$new();

      model = angular.extend(new _Source_(), dataSource1);

      // ensure that all pre-processing is called.
      if (!$scope.$$phase) {
        $scope.$digest();
      }
    });
  };

  beforeEach(function () {
    module("core");
    module("sage");
    module("templates");
    module("mock.user", function ($provide) {
      var User = function () {
        return MockedUser;
      };
      $provide.value("User", User);
    });
    module("mock.userService");
    module("mock.wsApi");

    initializeVariables();
    initializeModel();
  });

  afterEach(function () {
    $scope.$destroy();
  });

  describe("Is the model", function () {
    it("defined", function () {
      expect(model).toBeDefined();
    });
  });

  describe("Is the model method", function () {
    var methods = [
      "testPing",
      "testLocation",
      "testAuthorization"
    ];

    var modelMethodExists = function (key) {
      return function() {
        expect(model[key]).toBeDefined();
        expect(typeof model[key]).toEqual("function");
      };
    };

    for (var i in methods) {
      it(methods[i] + " defined", modelMethodExists(methods[i]));
    }
  });

  describe("Does the model method", function () {
    it("testPing work as expected", function () {
      var passedPath;

      WsApi.fetch = function (path, data) {
        passedPath = path;
      };

      spyOn(WsApi, "fetch").and.callThrough();

      model.testPing();
      $scope.$digest();

      expect(WsApi.fetch).toHaveBeenCalled();
      expect(passedPath.method).toBe("test/ping");
    });

    it("testLocation work as expected", function () {
      model.testLocation();
      $scope.$digest();
    });

    it("testAuthorization work as expected", function () {
      model.testAuthorization();
      $scope.$digest();
    });
  });
});
