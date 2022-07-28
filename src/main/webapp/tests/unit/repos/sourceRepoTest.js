describe("service: sourceRepo", function () {
  var $q, $rootScope, $scope, MockedUser, MockedSource, WsApi, repo;

  var initializeVariables = function (settings) {
    inject(function (_$q_, _$rootScope_, _WsApi_) {
      $q = _$q_;
      $rootScope = _$rootScope_;

      MockedUser = new mockUser($q);
      MockedSource = new mockSource($q);
      WsApi = _WsApi_;
    });
  };

  var initializeRepo = function (settings) {
    inject(function ($injector, SourceRepo) {
      $scope = $rootScope.$new();

      repo = SourceRepo;
    });
  };

  beforeEach(function () {
    module("core");
    module("sage");
    module("templates");
    module("mock.user", function ($provide) {
      var User = function () {
        return MockedUser;
      };
      $provide.value("User", User);
    });
    module("mock.userService");
    module("mock.source", function ($provide) {
      var Source = function () {
        return MockedSource;
      };
      $provide.value("Source", Source);
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
      "getAvailableFields",
      "getIndexedFields",
      "getReadable",
      "getWriteable"
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
    it("getAvailableFields work as expected", function () {
      repo.getAvailableFields("todo", "todo");
      $scope.$digest();

      // TODO
    });

    it("getIndexedFields work as expected", function () {
      repo.getIndexedFields("todo", "todo");
      $scope.$digest();

      // TODO
    });

    it("getReadable work as expected", function () {
      repo.getReadable();
      $scope.$digest();

      // TODO
    });

    it("getWriteable work as expected", function () {
      repo.getWriteable();
      $scope.$digest();

      // TODO
    });
  });

});
