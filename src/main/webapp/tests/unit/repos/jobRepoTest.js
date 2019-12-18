describe("service: jobRepo", function () {
  var $q, $rootScope, $scope, WsApi, repo;

  var initializeVariables = function (settings) {
    inject(function (_$q_, _$rootScope_, _WsApi_) {
      $q = _$q_;
      $rootScope = _$rootScope_;

      MockedJob = new mockJob($q);
      WsApi = _WsApi_;
    });
  };

  var initializeRepo = function (settings) {
    inject(function ($injector, JobRepo) {
      $scope = $rootScope.$new();

      repo = JobRepo;
    });
  };

  beforeEach(function () {
    module("core");
    module("sage");
    module("mock.job", function ($provide) {
      var Job = function () {
        return MockedJob;
      };
      $provide.value("Job", Job);
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

  describe("Are the repo methods defined", function () {
    it("run should be defined", function () {
      expect(repo.run).toBeDefined();
      expect(typeof repo.run).toEqual("function");
    });

    it("runAll should be defined", function () {
      expect(repo.runAll).toBeDefined();
      expect(typeof repo.runAll).toEqual("function");
    });
  });

  describe("Do the repo methods work as expected", function () {
    it("run should work", function () {
      repo.run(new mockJob($q));
      $scope.$digest();

      // TODO
    });

    it("runAll should work", function () {
      repo.runAll("todo");
      $scope.$digest();

      // TODO
    });
  });
});
