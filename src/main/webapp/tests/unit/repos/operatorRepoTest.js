describe("service: operatorRepo", function () {
  var $q, $rootScope, $scope, MockedOperator, WsApi, repo;

  var initializeVariables = function(settings) {
    inject(function (_$q_, _$rootScope_, _WsApi_) {
      $q = _$q_;
      $rootScope = _$rootScope_;

      MockedOperator = new mockOperator($q);
      WsApi = _WsApi_;
    });
  };

  var initializeRepo = function(settings) {
    inject(function ($injector, OperatorRepo) {
      $scope = $rootScope.$new();

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
      $scope.$digest();

      // TODO
    });
  });
});
