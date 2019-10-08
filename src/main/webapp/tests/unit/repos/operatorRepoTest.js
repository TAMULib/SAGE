describe("service: operatorRepo", function () {
  var q, repo, rootScope, scope, MockedOperator, WsApi;

  var initializeVariables = function(settings) {
    inject(function ($q, $rootScope, _WsApi_) {
      q = $q;
      rootScope = $rootScope;

      MockedOperator = new mockOperator(q);
      WsApi = _WsApi_;
    });
  };

  var initializeRepo = function(settings) {
    inject(function ($injector, OperatorRepo) {
      scope = rootScope.$new();

      repo = OperatorRepo;
    });
  };

  beforeEach(function() {
    module("core");
    module("sage");
    module("mock.operator", function($provide) {
      var Operator = function() {
        return MockedOperator;
      };
      $provide.value("Operator", Operator);
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
    it("getTypes should be defined", function () {
      expect(repo.getTypes).toBeDefined();
      expect(typeof repo.getTypes).toEqual("function");
    });
  });

  describe("Do the repo methods work as expected", function () {
    it("getTypes should work", function () {
      repo.getTypes();
      scope.$digest();

      // TODO
    });
  });
});
