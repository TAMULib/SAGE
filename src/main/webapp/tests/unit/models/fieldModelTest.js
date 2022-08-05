describe("model: Field", function () {
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
    inject(function (_Field_) {
      $scope = $rootScope.$new();

      model = angular.extend(new _Field_(), dataField1);

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
});
