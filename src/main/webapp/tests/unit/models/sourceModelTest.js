describe("model: Source", function () {
  var $q, $rootScope, $scope, WsApi, model;

  var initializeVariables = function (settings) {
    inject(function (_$q_, _$rootScope_, _WsApi_) {
      $q = _$q_;
      $rootScope = _$rootScope_;

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
    module("mock.wsApi");

    initializeVariables();
    initializeModel();
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

    for (var i in methods) {
      it(methods[i] + " defined", function () {
        expect(model[methods[i]]).toBeDefined();
        expect(typeof model[methods[i]]).toEqual("function");
      });
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
