describe("service: sourceRepo", function () {
  var $q, $rootScope, $scope, MockedSource, WsApi, repo;

  var initializeVariables = function (settings) {
    inject(function (_$q_, _$rootScope_, _WsApi_) {
      $q = _$q_;
      $rootScope = _$rootScope_;

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

    for (var i in methods) {
      it(methods[i] + " defined", function () {
        expect(repo[methods[i]]).toBeDefined();
        expect(typeof repo[methods[i]]).toEqual("function");
      });
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
