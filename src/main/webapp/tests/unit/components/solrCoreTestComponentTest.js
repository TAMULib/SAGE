describe("component: solrCoreTest", function () {
  var compile, component, controller, element, q, scope, MockedSource, source;

  var initializeVariables = function() {
    inject(function ($compile, $q) {
      compile = $compile;
      q = $q;

      MockedSource = new mockSource(q);

      source = "";
    });
  };

  var initializeComponent = function(settings) {
    inject(function ($rootScope) {
      scope = $rootScope.$new();

      // note: a "SolrCore" is a "Source".
      element = angular.element("<solr-core-test solr-core=\"source\"></solr-core-test>");
      component = compile(element)(scope);

      scope.source = source;

      scope.$digest();

      // @todo find a way to unit test controller methods, the angularjs documentation uses a Spy, which prevents actual unit testing.
    });
  };

  beforeEach(function() {
    module("core");
    module("sage");
    module('templates');
    module("mock.source", function($provide) {
      var Source = function() {
        return MockedSource;
      };
      $provide.value("Source", Source);
    });

    installPromiseMatchers();
    initializeVariables();
  });

  describe("Is the component defined", function () {
    it("should be defined", function () {
      initializeComponent();
      expect(component).toBeDefined();
    });
  });

});
