describe("service: readerRepo", function () {
  var q, repo, rootScope, scope, MockedReader, WsApi;

  var initializeVariables = function(settings) {
    inject(function ($q, $rootScope, _WsApi_) {
      q = $q;
      rootScope = $rootScope;

      MockedReader = new mockReader(q);
      WsApi = _WsApi_;
    });
  };

  var initializeRepo = function(settings) {
    inject(function ($injector, ReaderRepo) {
      scope = rootScope.$new();

      repo = ReaderRepo;
    });
  };

  beforeEach(function() {
    module("core");
    module("sage");
    module("mock.reader", function($provide) {
      var Reader = function() {
        return MockedReader;
      };
      $provide.value("Reader", Reader);
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
