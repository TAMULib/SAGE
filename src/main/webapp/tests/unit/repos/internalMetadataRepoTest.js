describe("service: internalMetadataRepo", function () {
  var $q, $rootScope, $scope, MockedInternalMetadata, WsApi, repo;

  var initializeVariables = function (settings) {
    inject(function (_$q_, _$rootScope_, _WsApi_) {
      $q = _$q_;
      $rootScope = _$rootScope_;

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

  describe("Is the repo defined", function () {
    it("should be defined", function () {
      expect(repo).toBeDefined();
    });
  });

});
