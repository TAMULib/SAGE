describe("model: DiscoveryView", function () {
  var $rootScope, $scope, $location, MockedUser, WsApi, model, routeParams;

  var initializeVariables = function (settings) {
    inject(function (_$q_, _$location_, _$rootScope_, _WsApi_) {
      $q = _$q_;
      $location = _$location_;
      $rootScope = _$rootScope_;

      if (settings && settings.routeParams) {
        angular.extend(routeParams, settings.routeParams);
      }

      MockedUser = new mockUser($q);
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
});
