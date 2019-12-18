describe("component: facetWidget", function () {
  var $compile, $httpBackend, $scope, component, element, facet, discoveryContext, resetSearch;

  var initializeVariables = function () {
    inject(function (_$compile_, _$httpBackend_) {
      $compile = _$compile_;
      $httpBackend = _$httpBackend_;

      $httpBackend.whenGET("views/components/facetTypes/Facet.html").respond("<div></div>");

      facet = "";
      discoveryContext = undefined;
      resetSearch  = "";
    });
  };

  var initializeComponent = function () {
    inject(function (_$rootScope_) {
      $scope = _$rootScope_.$new();

      element = angular.element("<facet-widget facet=\"facet\" discovery-context=\"discoveryContext\" reset-search=\"resetSearch\"></facet-widget>");
      component = $compile(element)($scope);

      $scope.facet = facet;
      $scope.discoveryContext = discoveryContext;
      $scope.resetSearch = resetSearch;

      $scope.$digest();

      // @todo find a way to unit test controller methods, the angularjs documentation uses a Spy, which prevents actual unit testing.
    });
  };

  beforeEach(function () {
    module("core");
    module("sage");
    module("templates");

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
