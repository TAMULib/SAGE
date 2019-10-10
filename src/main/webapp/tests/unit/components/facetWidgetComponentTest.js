describe("component: facetWidget", function () {
  var compile, component, controller, element, httpBackend, scope, facet, discoveryContext, resetSearch;

  var initializeVariables = function() {
    inject(function ($compile, $httpBackend) {
      compile = $compile;
      httpBackend = $httpBackend;

      httpBackend.whenGET('views/components/facetTypes/Facet.html').respond('<div></div>');

      facet = "";
      discoveryContext = undefined;
      resetSearch  = "";
    });
  };

  var initializeComponent = function() {
    inject(function ($rootScope) {
      scope = $rootScope.$new();

      element = angular.element("<facet-widget facet=\"facet\" discovery-context=\"discoveryContext\" reset-search=\"resetSearch\"></facet-widget>");
      component = compile(element)(scope);

      scope.facet = facet;
      scope.discoveryContext = discoveryContext;
      scope.resetSearch = resetSearch;

      scope.$digest();

      // @todo find a way to unit test controller methods, the angularjs documentation uses a Spy, which prevents actual unit testing.
    });
  };

  beforeEach(function() {
    module("core");
    module("sage");
    module('templates');

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
