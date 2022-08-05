describe("service: discoveryViewRepo", function () {
  var $q, $rootScope, $scope, MockedUser, MockedDiscoveryView, WsApi, repo;

  var initializeVariables = function (settings) {
    inject(function (_$q_, _$rootScope_, _WsApi_) {
      $q = _$q_;
      $rootScope = _$rootScope_;

      MockedUser = new mockUser($q);
      MockedDiscoveryView = new mockDiscoveryView($q);
      WsApi = _WsApi_;
    });
  };

  var initializeRepo = function (settings) {
    inject(function ($injector, DiscoveryViewRepo) {
      $scope = $rootScope.$new();

      repo = DiscoveryViewRepo;
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
    module("mock.discoveryView", function ($provide) {
      var DiscoveryView = function () {
        return MockedDiscoveryView;
      };
      $provide.value("DiscoveryView", DiscoveryView);
    });
    module("mock.wsApi");

    initializeVariables();
    initializeRepo();
  });

  describe("Is the repo", function () {
    it("defined", function () {
      expect(repo).toBeDefined();
    });
  });

});
