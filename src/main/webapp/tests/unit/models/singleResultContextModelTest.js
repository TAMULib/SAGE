describe("model: SingleResultContext", function () {
  var $rootScope, $scope, $location, WsApi, model;

  var initializeVariables = function (settings) {
    inject(function (_$location_, _$rootScope_, _WsApi_) {
      $location = _$location_;
      $rootScope = _$rootScope_;

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
    it("getBreadcrumb should be defined", function () {
      expect(model.getBreadcrumb).toBeDefined();
      expect(typeof model.getBreadcrumb).toEqual("function");
    });
  });

  describe("Are the model methods working as expected", function () {
    it("getBreadcrumb should work", function () {
      var result;

      result = model.getBreadcrumb();
      expect(result.label).toBe(model.title);
    });
  });
});
