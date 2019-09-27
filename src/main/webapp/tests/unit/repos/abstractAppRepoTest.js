describe("service: abstractAppRepo", function () {
  var q, repo, rootScope, mockedRepo, scope, WsApi;

  var initializeVariables = function(settings) {
    inject(function ($q, $rootScope, _WsApi_) {
      q = $q;
      rootScope = $rootScope;

      WsApi = _WsApi_;
    });
  };

  var initializeRepo = function(settings) {
    inject(function ($injector) {
      scope = rootScope.$new();
      mockedRepo = new mockRepo("AbstractAppRepo", q);
      repo = $injector.get("AbstractAppRepo")();

      // FIXME: find a way to get something like `angular.extend(new mockRepo("AbstractAppRepo", q), $injector.get("AbstractAppRepo")())` or `repo = AbstractAppRepo` to work.
      repo.getAll = mockedRepo.getAll;
      repo.listen = mockedRepo.listen;
      repo.ready = mockedRepo.ready;
    });
  };

  beforeEach(function() {
    module("core");
    module("sage");
    module("mock.wsApi");

    initializeVariables();
    initializeRepo();
  });

  describe("Is the repo defined", function () {
    it("should be defined", function () {
      expect(repo).toBeDefined();
    });
  });

  describe("Are the repo methods defined", function () {
    it("getScaffold should be defined", function () {
      expect(repo.getScaffold).toBeDefined();
      expect(typeof repo.getScaffold).toEqual("function");
    });

    it("isInScaffold should be defined", function () {
      expect(repo.isInScaffold).toBeDefined();
      expect(typeof repo.isInScaffold).toEqual("function");
    });
  });

  describe("Do the repo methods work as expected", function () {
    it("getScaffold should work", function () {
      repo.getScaffold();
      scope.$digest();

      // TODO
    });

    it("getScaffold should work", function () {
      repo.isInScaffold("todo");
      scope.$digest();

      // TODO
    });
  });
});
