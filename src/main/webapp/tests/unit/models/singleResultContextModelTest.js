describe("model: SingleResultContext", function () {
  var $rootScope, $scope, $location, MockedUser, WsApi, model;

  var initializeVariables = function (settings) {
    inject(function (_$q_, _$location_, _$rootScope_, _WsApi_) {
      $q = _$q_;
      $location = _$location_;
      $rootScope = _$rootScope_;

      MockedUser = new mockUser($q);
      WsApi = _WsApi_;
    });
  };

  var initializeModel = function (settings) {
    inject(function (_SingleResultContext_) {
      $scope = $rootScope.$new();

      model = angular.extend(new _SingleResultContext_(), dataSingleResultContext1);

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
      "getBreadcrumb"
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
    it("getBreadcrumb work as expected", function () {
      var result;

      result = model.getBreadcrumb();
      expect(result.label).toBe(model.title);
    });
  });
});
