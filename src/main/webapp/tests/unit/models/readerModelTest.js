describe("model: Reader", function () {
  var $rootScope, $scope, WsApi, model;

  var initializeVariables = function(settings) {
    inject(function (_$rootScope_, _WsApi_) {
      $rootScope = _$rootScope_;

      WsApi = _WsApi_;
    });
  };

  var initializeModel = function(settings) {
    inject(function (_Reader_) {
      $scope = $rootScope.$new();

      model = angular.extend(new _Reader_(), dataReader1);

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
});
