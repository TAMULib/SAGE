describe("service: writerRepo", function () {
  var q, repo, rootScope, scope, MockedWriter, WsApi;

  var initializeVariables = function(settings) {
    inject(function ($q, $rootScope, _WsApi_) {
      q = $q;
      rootScope = $rootScope;

      MockedWriter = new mockWriter(q);
      WsApi = _WsApi_;
    });
  };

  var initializeRepo = function(settings) {
    inject(function ($injector, WriterRepo) {
      scope = rootScope.$new();

      repo = WriterRepo;
    });
  };

  beforeEach(function() {
    module("core");
    module("sage");
    module("mock.writer", function($provide) {
      var Writer = function() {
        return MockedWriter;
      };
      $provide.value("Writer", Writer);
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
