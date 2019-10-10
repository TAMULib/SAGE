describe("component: multiSuggestionInput", function () {
  var compile, component, controller, element, scope, suggestions, model, property, optionproperty, displayproperty, name, label, placeholder;

  var initializeVariables = function() {
    inject(function ($compile) {
      compile = $compile;

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

  var initializeComponent = function() {
    inject(function ($rootScope) {
      scope = $rootScope.$new();

      element = angular.element("<multi-suggestion-input suggestions=\"suggestions\" model=\"model\" property=\"property\" optionproperty=\"optionproperty\" displayproperty=\"displayproperty\" name=\"name\" label=\"label\" placeholder=\"placeholder\"></multi-suggestion-input>");
      component = compile(element)(scope);

      scope.suggestions = suggestions;
      scope.model = model;
      scope.property = property;
      scope.optionproperty = optionproperty;
      scope.name = name;
      scope.label = label;
      scope.placeholder = placeholder;

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
