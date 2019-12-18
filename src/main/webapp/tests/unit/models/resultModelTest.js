describe("model: Result", function () {
  var $rootScope, $scope, $location, WsApi, model;

  var initializeVariables = function (settings) {
    inject(function (_$location_, _$rootScope_, _WsApi_) {
      $location = _$location_;
      $rootScope = _$rootScope_;

      WsApi = _WsApi_;
    });
  };

  var initializeModel = function (settings) {
    inject(function (_Result_) {
      $scope = $rootScope.$new();

      model = angular.extend(new _Result_(), dataResult1);

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

  describe("Is the model defined", function () {
    it("should be defined", function () {
      expect(model).toBeDefined();
    });
  });

  describe("Are the model methods defined", function () {
    it("getValue should be defined", function () {
      expect(model.getValue).toBeDefined();
      expect(typeof model.getValue).toEqual("function");
    });
  });

  describe("Are the model methods working as expected", function () {
    it("getValue should work", function () {
      var response;

      model.fields = { mockKey: "mock value" };

      response = model.getValue("mockKey");
      expect(response).toBe(model.fields.mockKey);

      response = model.getValue("does not exist");
      expect(response).not.toBeDefined();
    });
  });
});
