describe("component: multiSuggestionInput", function () {
  var $compile, $scope, MockedUser, component, element, suggestions, model, property, optionproperty, displayproperty, name, label, placeholder;

  var initializeVariables = function () {
    inject(function (_$q_, _$compile_) {
      $q = _$q_;
      $compile = _$compile_;

      MockedUser = new mockUser($q);

      suggestions = "";
      model = {};
      property = "";
      optionproperty = "";
      displayproperty = "";
      name = "";
      label = "";
      placeholder = "";
    });
  };

  var initializeComponent = function () {
    inject(function (_$rootScope_) {
      $scope = _$rootScope_.$new();

      element = angular.element("<multi-suggestion-input suggestions=\"suggestions\" model=\"model\" property=\"property\" optionproperty=\"optionproperty\" displayproperty=\"displayproperty\" name=\"name\" label=\"label\" placeholder=\"placeholder\"></multi-suggestion-input>");
      component = $compile(element)($scope);

      $scope.suggestions = suggestions;
      $scope.model = model;
      $scope.property = property;
      $scope.optionproperty = optionproperty;
      $scope.name = name;
      $scope.label = label;
      $scope.placeholder = placeholder;

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
