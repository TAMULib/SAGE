describe("directive: breadcrumbs", function () {
  var $compile, $q, $scope, MockedDiscoveryContext, MockedSingleResultContext, directive, element, contexts, home, reload;

  var initializeVariables = function () {
    inject(function (_$q_, _$compile_) {
      $q = _$q_;
      $compile = _$compile_;

      MockedDiscoveryContext = new mockDiscoveryContext($q);
      MockedSingleResultContext = new mockSingleResultContext($q);

      contexts = [];
      home = "";
      reload = "";
    });
  };

  var initializeDirective = function (settings) {
    inject(function (_$rootScope_) {
      $scope = _$rootScope_.$new();

      var attr = settings && settings.attr ? settings.attr : "contexts=\"contexts\" home=\"home\" reload=\"reload\"";
      var body = settings && settings.body ? settings.body : "";

      element = angular.element("<breadcrumbs " + attr + ">" + body + "</breadcrumbs>")
      directive = $compile(element)($scope);

      $scope.contexts = contexts;
      $scope.home = home;
      $scope.reload = reload;

      $scope.$digest();
    });
  };

  beforeEach(function () {
    module("core");
    module("sage");
    module("templates");
    module("mock.discoveryContext", function ($provide) {
      var DiscoveryContext = function () {
        return MockedDiscoveryContext;
      };
      $provide.value("DiscoveryContext", DiscoveryContext);
    });
    module("mock.singleResultContext", function ($provide) {
      var SingleResultContext = function () {
        return MockedSingleResultContext;
      };
      $provide.value("SingleResultContext", SingleResultContext);
    });

    installPromiseMatchers();
    initializeVariables();
  });

  describe("Is the directive", function () {
    it("defined", function () {
      initializeDirective();
      expect(directive).toBeDefined();
    });
  });

  describe("Does the directive", function () {
    it("work with a single context", function () {
      contexts: [ new mockDiscoveryContext($q) ];

      initializeDirective();
      expect(directive).toBeDefined();
    });

    it("work with multiple contexts", function () {
      contexts = [ new mockDiscoveryContext($q), new mockSingleResultContext($q) ];

      initializeDirective();
      expect(directive).toBeDefined();
    });

    it("define the home property", function () {
      home = {
        label: "Mocked Home",
        path: "http://localhost/"
      };

      initializeDirective();
      expect(directive).toBeDefined();
    });

    it("define the reload property", function () {
      reload = function () {};

      initializeDirective();
      expect(directive).toBeDefined();
    });
  });

});
