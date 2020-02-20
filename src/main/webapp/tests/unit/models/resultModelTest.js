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

  describe("Is the model", function () {
    it("defined", function () {
      expect(model).toBeDefined();
    });
  });

  describe("Is the model method", function () {
    var methods = [
      "getValue"
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

  describe("Are the model methods work as expected", function () {
    it("getValue work as expected", function () {
      var response;

      model.fields = { mockKey: "mock value" };

      response = model.getValue("mockKey");
      expect(response).toBe(model.fields.mockKey);

      response = model.getValue("does not exist");
      expect(response).not.toBeDefined();
    });
  });
});
