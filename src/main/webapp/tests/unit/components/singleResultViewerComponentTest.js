describe("component: singleResultViewer", function () {
  var $compile, $q, $scope, $timeout, MockedSingleResultContext, component, element, context;

  var initializeVariables = function() {
    inject(function (_$compile_, _$q_, _$timeout_) {
      $compile = _$compile_;
      $q = _$q_;
      $timeout = _$timeout_;

      MockedSingleResultContext = new mockSingleResultContext($q);

      context = "";
    });
  };

  var initializeComponent = function() {
    inject(function (_$rootScope_) {
      $scope = _$rootScope_.$new();

      element = angular.element("<single-result-viewer context=\"context\"></single-result-viewer>");
      component = $compile(element)($scope);

      $scope.context = context;

      $scope.$digest();

      // @todo find a way to unit test controller methods, the angularjs documentation uses a Spy, which prevents actual unit testing.
    });
  };

  beforeEach(function() {
    module("core");
    module("sage");
    module("templates");
    module("mock.singleResultContext", function($provide) {
      var SingleResultContext = function() {
        return MockedSingleResultContext;
      };
      $provide.value("SingleResultContext", SingleResultContext);
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

  describe("Does the component initialize properly", function () {
    it("should assign ready after a $timeout", function () {
      context = new mockSingleResultContext($q);

      initializeComponent();

      //expect($scope.ready).toBe(false);

      $timeout.flush();
      //expect($scope.ready).toBe(false);

      $scope.$digest();
      //expect($scope.ready).toBe(true);
    });
  });

});
