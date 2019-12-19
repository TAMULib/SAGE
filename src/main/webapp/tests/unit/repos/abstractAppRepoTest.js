describe("service: abstractAppRepo", function () {
  var $q, $rootScope, $scope, WsApi, repo, mockedRepo;

  var initializeVariables = function (settings) {
    inject(function (_$q_, _$rootScope_, _WsApi_) {
      $q = _$q_;
      $rootScope = _$rootScope_;

      WsApi = _WsApi_;
    });
  };

  var initializeRepo = function (settings) {
    inject(function ($injector) {
      $scope = $rootScope.$new();
      mockedRepo = new mockRepo("AbstractAppRepo", $q);
      repo = $injector.get("AbstractAppRepo")();

      // @fixme find a way to get something like `angular.extend(new mockRepo("AbstractAppRepo", $q), $injector.get("AbstractAppRepo")())` or `repo = AbstractAppRepo` to work.
      repo.getAll = mockedRepo.getAll;
      repo.listen = mockedRepo.listen;
      repo.ready = mockedRepo.ready;
    });
  };

  beforeEach(function () {
    module("core");
    module("sage");
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
      "getScaffold",
      "isInScaffold"
    ];

    var repoMethodExists = function (key) {
      return function() {
        expect(repo[key]).toBeDefined();
        expect(typeof repo[key]).toEqual("function");
      };
    };

    for (var i in methods) {
      it(methods[i] + " defined", repoMethodExists(methods[i]));
    }
  });

  describe("Does the repo method", function () {
    it("getScaffold work as expected", function () {
      repo.getScaffold();
      $scope.$digest();

      // TODO
    });

    it("getScaffold work as expected", function () {
      repo.isInScaffold("todo");
      $scope.$digest();

      // TODO
    });
  });
});
