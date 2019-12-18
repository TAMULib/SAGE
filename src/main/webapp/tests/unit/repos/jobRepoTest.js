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

  describe("Is the repo", function () {
    it("defined", function () {
      expect(repo).toBeDefined();
    });
  });

  describe("Is the repo method", function () {
    var methods = [
      "run",
      "runAll"
    ];

    for (var i in methods) {
      it(methods[i] + " defined", function () {
        expect(repo[methods[i]]).toBeDefined();
        expect(typeof repo[methods[i]]).toEqual("function");
      });
    }
  });

  describe("Does the repo method", function () {
    it("run work as expected", function () {
      repo.run(new mockJob($q));
      $scope.$digest();

      // TODO
    });

    it("runAll work as expected", function () {
      repo.runAll("todo");
      $scope.$digest();

      // TODO
    });
  });
});
