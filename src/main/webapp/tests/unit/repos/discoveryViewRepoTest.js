describe("service: discoveryViewRepo", function () {
  var q, repo, rootScope, scope, MockedDiscoveryView, WsApi;

  var initializeVariables = function(settings) {
    inject(function ($q, $rootScope, _WsApi_) {
      q = $q;
      rootScope = $rootScope;

      MockedDiscoveryView = new mockDiscoveryView(q);
      WsApi = _WsApi_;
    });
  };

  var initializeRepo = function(settings) {
    inject(function ($injector, DiscoveryViewRepo) {
      scope = rootScope.$new();

      repo = DiscoveryViewRepo;
    });
  };

  beforeEach(function() {
    module("core");
    module("sage");
    module("mock.discoveryView", function($provide) {
      var DiscoveryView = function() {
        return MockedDiscoveryView;
      };
      $provide.value("DiscoveryView", DiscoveryView);
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
