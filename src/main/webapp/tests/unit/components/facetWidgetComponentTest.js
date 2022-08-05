describe("component: facetWidget", function () {
  var $compile, $httpBackend, $scope, MockedUser, component, element, facet, discoveryContext, resetSearch;

  var initializeVariables = function () {
    inject(function (_$q_, _$compile_, _$httpBackend_) {
      $q = _$q_;
      $compile = _$compile_;
      $httpBackend = _$httpBackend_;

      MockedUser = new mockUser($q);

      $httpBackend.whenGET("views/components/facetTypes/Facet.html").respond("<div></div>");
      $httpBackend.whenGET("node_modules/@wvr/core/app/views/modalWrapper.html").respond("<div></div>");

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
    module("mock.user", function ($provide) {
      var User = function () {
        return MockedUser;
      };
      $provide.value("User", User);
    });
    module("mock.userService");

    installPromiseMatchers();
    initializeVariables();
  });

  afterEach(function () {
    $scope.$destroy();
  });

  describe("Is the component", function () {
    it("defined", function () {
      initializeComponent();
      expect(component).toBeDefined();
    });
  });

});
