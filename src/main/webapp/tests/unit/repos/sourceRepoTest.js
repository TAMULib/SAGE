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

  describe("Is the repo defined", function () {
    it("should be defined", function () {
      expect(repo).toBeDefined();
    });
  });

  describe("Are the repo methods defined", function () {
    it("getAvailableFields should be defined", function () {
      expect(repo.getAvailableFields).toBeDefined();
      expect(typeof repo.getAvailableFields).toEqual("function");
    });

    it("getIndexedFields should be defined", function () {
      expect(repo.getIndexedFields).toBeDefined();
      expect(typeof repo.getIndexedFields).toEqual("function");
    });

    it("getReadable should be defined", function () {
      expect(repo.getReadable).toBeDefined();
      expect(typeof repo.getReadable).toEqual("function");
    });

    it("getWriteable should be defined", function () {
      expect(repo.getWriteable).toBeDefined();
      expect(typeof repo.getWriteable).toEqual("function");
    });
  });

  describe("Do the repo methods work as expected", function () {
    it("getAvailableFields should work", function () {
      repo.getAvailableFields("todo", "todo");
      $scope.$digest();

      // TODO
    });

    it("getIndexedFields should work", function () {
      repo.getIndexedFields("todo", "todo");
      $scope.$digest();

      // TODO
    });

    it("getReadable should work", function () {
      repo.getReadable();
      $scope.$digest();

      // TODO
    });

    it("getWriteable should work", function () {
      repo.getWriteable();
      $scope.$digest();

      // TODO
    });
  });

});
