describe("component: singleResultViewer", function () {
  var $compile, $q, $scope, $timeout, MockedUser, MockedSingleResultContext, component, element, context;

  var initializeVariables = function () {
    inject(function (_$q_, _$compile_, _$timeout_) {
      $q = _$q_;
      $compile = _$compile_;
      $timeout = _$timeout_;

      MockedUser = new mockUser($q);
      MockedSingleResultContext = new mockSingleResultContext($q);

      context = "";
    });
  };

  var initializeComponent = function () {
    inject(function (_$rootScope_) {
      $scope = _$rootScope_.$new();

      element = angular.element("<single-result-viewer context=\"context\"></single-result-viewer>");
      component = $compile(element)($scope);

      $scope.context = context;

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
    module("mock.singleResultContext", function ($provide) {
      var SingleResultContext = function () {
        return MockedSingleResultContext;
      };
      $provide.value("SingleResultContext", SingleResultContext);
    });

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

  describe("Does the component", function () {
    it("assign ready after a $timeout", function () {
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
