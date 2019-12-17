describe("model: Source", function () {
  var $q, $rootScope, $scope, WsApi, model;

  var initializeVariables = function(settings) {
    inject(function (_$q_, _$rootScope_, _WsApi_) {
      $q = _$q_;
      $rootScope = _$rootScope_;

      WsApi = _WsApi_;
    });
  };

  var initializeModel = function(settings) {
    inject(function (_Source_) {
      $scope = $rootScope.$new();

      model = angular.extend(new _Source_(), dataSource1);

      // ensure that all pre-processing is called.
      if (!$scope.$$phase) {
        $scope.$digest();
      }
    });
  };

  beforeEach(function() {
    module("core");
    module("sage");
    module("mock.wsApi");

    initializeVariables();
    initializeModel();
  });

  describe("Is the model defined", function () {
    it("should be defined", function () {
      expect(model).toBeDefined();
    });
  });

  describe("Are the model methods defined", function () {
    it("testPing should be defined", function () {
      expect(model.testPing).toBeDefined();
      expect(typeof model.testPing).toEqual("function");
    });

    it("testLocation should be defined", function () {
      expect(model.testLocation).toBeDefined();
      expect(typeof model.testLocation).toEqual("function");
    });

    it("testAuthorization should be defined", function () {
      expect(model.testAuthorization).toBeDefined();
      expect(typeof model.testAuthorization).toEqual("function");
    });
  });

  describe("Are the model methods working as expected", function () {
    it("testPing should work", function () {
      var passedPath;

      WsApi.fetch = function(path, data) {
        passedPath = path;
      };

      spyOn(WsApi, "fetch").and.callThrough();

      model.testPing();
      $scope.$digest();

      expect(WsApi.fetch).toHaveBeenCalled();
      expect(passedPath.method).toBe("test/ping");
    });

    it("testLocation should work", function () {
      model.testLocation();
      $scope.$digest();
    });

    it("testAuthorization should work", function () {
      model.testAuthorization();
      $scope.$digest();
    });
  });
});
