describe("directive: breadcrumbs", function () {
  var compile, directive, element, q, scope, MockedDiscoveryContext, MockedSingleResultContext, contexts, home, reload;

  var initializeVariables = function() {
    inject(function ($q, $compile) {
      q = $q;
      compile = $compile;

      MockedDiscoveryContext = new mockDiscoveryContext(q);
      MockedSingleResultContext = new mockSingleResultContext(q);

      contexts = [];
      reload = "";
      home = "";
    });
  };

  var initializeDirective = function() {
    inject(function ($rootScope) {
      scope = $rootScope.$new();

      element = angular.element("<breadcrumbs contexts=\"contexts\" home=\"home\" reload=\"reload\"></breadcrumbs>")
      directive = compile(element)(scope);

      scope.contexts = contexts;
      scope.reload = reload;
      scope.home = home;

      scope.$digest();
    });
  };

  beforeEach(function() {
    module("core");
    module("sage");
    module('templates');
    module("mock.discoveryContext", function($provide) {
      var DiscoveryContext = function() {
        return MockedDiscoveryContext;
      };
      $provide.value("DiscoveryContext", DiscoveryContext);
    });
    module("mock.singleResultContext", function($provide) {
      var SingleResultContext = function() {
        return MockedSingleResultContext;
      };
      $provide.value("SingleResultContext", SingleResultContext);
    });

    installPromiseMatchers();
    initializeVariables();
  });

  describe("Is the directive defined", function () {
    it("should be defined", function () {
      initializeDirective();
      expect(directive).toBeDefined();
    });
  });

  describe("Does the directive initialize properly", function () {
    it("should work with a single context", function () {
      contexts: [ new mockDiscoveryContext(q) ];

      initializeDirective();
      expect(directive).toBeDefined();
    });

    it("should work with multiple contexts", function () {
      contexts = [ new mockDiscoveryContext(q), new mockSingleResultContext(q) ];

      initializeDirective();
      expect(directive).toBeDefined();
    });

    it("should be defined, with home property", function () {
      home = {
        label: "Mocked Home",
        path: "http://localhost/"
      };

      initializeDirective();
      expect(directive).toBeDefined();
    });

    it("should be defined, with reload property", function () {
      reload = function() {};

      initializeDirective();
      expect(directive).toBeDefined();
    });
  });

});
