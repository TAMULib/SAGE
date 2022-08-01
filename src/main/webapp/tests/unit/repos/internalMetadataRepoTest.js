describe("service: internalMetadataRepo", function () {
  var $q, $rootScope, $scope, MockedUser, MockedInternalMetadata, WsApi, repo;

  var initializeVariables = function (settings) {
    inject(function (_$q_, _$rootScope_, _WsApi_) {
      $q = _$q_;
      $rootScope = _$rootScope_;

      MockedUser = new mockUser($q);
      MockedInternalMetadata = new mockInternalMetadata($q);
      WsApi = _WsApi_;
    });
  };

  var initializeRepo = function (settings) {
    inject(function ($injector, InternalMetadataRepo) {
      $scope = $rootScope.$new();

      repo = InternalMetadataRepo;
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
    module("mock.internalMetadata", function ($provide) {
      var InternalMetadata = function () {
        return MockedInternalMetadata;
      };
      $provide.value("InternalMetadata", InternalMetadata);
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
