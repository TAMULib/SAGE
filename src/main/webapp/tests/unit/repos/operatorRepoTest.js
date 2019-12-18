describe("service: operatorRepo", function () {
  var $q, $rootScope, $scope, MockedOperator, WsApi, repo;

  var initializeVariables = function (settings) {
    inject(function (_$q_, _$rootScope_, _WsApi_) {
      $q = _$q_;
      $rootScope = _$rootScope_;

      MockedOperator = new mockOperator($q);
      WsApi = _WsApi_;
    });
  };

  var initializeRepo = function (settings) {
    inject(function ($injector, OperatorRepo) {
      $scope = $rootScope.$new();

      repo = OperatorRepo;
    });
  };

  beforeEach(function () {
    module("core");
    module("sage");
    module("mock.operator", function ($provide) {
      var Operator = function () {
        return MockedOperator;
      };
      $provide.value("Operator", Operator);
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
      "getTypes"
    ];

    for (var i in methods) {
      it(methods[i] + " defined", function () {
        expect(repo[methods[i]]).toBeDefined();
        expect(typeof repo[methods[i]]).toEqual("function");
      });
    }
  });

  describe("Does the repo method", function () {
    it("getTypes work as expected", function () {
      repo.getTypes();
      $scope.$digest();

      // TODO
    });
  });
});
