describe("service: writerRepo", function () {
  var $q, $rootScope, $scope, MockedWriter, WsApi, repo;

  var initializeVariables = function (settings) {
    inject(function (_$q_, _$rootScope_, _WsApi_) {
      $q = _$q_;
      $rootScope = _$rootScope_;

      MockedWriter = new mockWriter($q);
      WsApi = _WsApi_;
    });
  };

  var initializeRepo = function (settings) {
    inject(function ($injector, WriterRepo) {
      $scope = $rootScope.$new();

      repo = WriterRepo;
    });
  };

  beforeEach(function () {
    module("core");
    module("sage");
    module("mock.writer", function ($provide) {
      var Writer = function () {
        return MockedWriter;
      };
      $provide.value("Writer", Writer);
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
