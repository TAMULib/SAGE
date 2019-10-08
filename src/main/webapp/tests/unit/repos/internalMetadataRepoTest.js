describe("service: internalMetadataRepo", function () {
  var q, repo, rootScope, scope, MockedInternalMetadata, WsApi;

  var initializeVariables = function(settings) {
    inject(function ($q, $rootScope, _WsApi_) {
      q = $q;
      rootScope = $rootScope;

      MockedInternalMetadata = new mockInternalMetadata(q);
      WsApi = _WsApi_;
    });
  };

  var initializeRepo = function(settings) {
    inject(function ($injector, InternalMetadataRepo) {
      scope = rootScope.$new();

      repo = InternalMetadataRepo;
    });
  };

  beforeEach(function() {
    module("core");
    module("sage");
    module("mock.internalMetadata", function($provide) {
      var InternalMetadata = function() {
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
