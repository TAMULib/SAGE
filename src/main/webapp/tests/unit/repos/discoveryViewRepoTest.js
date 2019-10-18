describe("service: discoveryViewRepo", function () {
  var $q, $rootScope, $scope, MockedDiscoveryView, WsApi, repo;

  var initializeVariables = function(settings) {
    inject(function (_$q_, _$rootScope_, _WsApi_) {
      $q = _$q_;
      $rootScope = _$rootScope_;

      MockedDiscoveryView = new mockDiscoveryView($q);
      WsApi = _WsApi_;
    });
  };

  var initializeRepo = function(settings) {
    inject(function ($injector, DiscoveryViewRepo) {
      $scope = $rootScope.$new();

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
