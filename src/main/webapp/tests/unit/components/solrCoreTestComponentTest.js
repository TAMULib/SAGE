describe("component: solrCoreTest", function () {
  var $compile, $q, $scope, MockedSource, component, element, source;

  var initializeVariables = function() {
    inject(function (_$compile_, _$q_) {
      $compile = _$compile_;
      $q = _$q_;

      MockedSource = new mockSource($q);

      source = "";
    });
  };

  var initializeComponent = function(settings) {
    inject(function (_$rootScope_) {
      $scope = _$rootScope_.$new();

      // note: a "SolrCore" is a "Source".
      element = angular.element("<solr-core-test solr-core=\"source\"></solr-core-test>");
      component = $compile(element)($scope);

      $scope.source = source;

      $scope.$digest();

      // @todo find a way to unit test controller methods, the angularjs documentation uses a Spy, which prevents actual unit testing.
    });
  };

  beforeEach(function() {
    module("core");
    module("sage");
    module("templates");
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
