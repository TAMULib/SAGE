describe("model: DiscoveryView", function () {
  var $rootScope, $scope, $location, WsApi, model, routeParams;

  var initializeVariables = function (settings) {
    inject(function (_$location_, _$rootScope_, _WsApi_) {
      $location = _$location_;
      $rootScope = _$rootScope_;

      if (settings && settings.routeParams) {
        angular.extend(routeParams, settings.routeParams);
      }

      WsApi = _WsApi_;
    });
  };

  var initializeModel = function (settings) {
    inject(function (_DiscoveryView_) {
      $scope = $rootScope.$new();

      if (settings) {
        if (settings.routeParams) {
          angular.extend(routeParams, settings.routeParams);
        }
      }

      model = angular.extend(new _DiscoveryView_(), dataDiscoveryView1);

      // ensure that all pre-processing is called.
      if (!$scope.$$phase) {
        $scope.$digest();
      }
    });
  };

  beforeEach(function () {
    module("core", function ($provide) {
      routeParams = {};
      $provide.value("$routeParams", routeParams);
    });
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
