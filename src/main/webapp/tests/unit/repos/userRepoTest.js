describe("service: userRepo", function () {
  var q, repo, rootScope, scope, MockedUser, WsApi;

  var initializeVariables = function(settings) {
    inject(function ($q, $rootScope, _WsApi_) {
      q = $q;
      rootScope = $rootScope;

      MockedUser = new mockUser(q);
      WsApi = _WsApi_;
    });
  };

  var initializeRepo = function(settings) {
    inject(function ($injector, UserRepo) {
      scope = rootScope.$new();

      repo = UserRepo;
    });
  };

  beforeEach(function() {
    module("core");
    module("sage");
    module("mock.user", function($provide) {
      var User = function() {
        return MockedUser;
      };
      $provide.value("User", User);
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
