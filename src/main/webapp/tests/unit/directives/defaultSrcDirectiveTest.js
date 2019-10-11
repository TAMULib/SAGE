describe("directive: defaultSrc", function () {
  var $compile, $scope, directive, element, defaultSrc;

  var initializeVariables = function(settings) {
    inject(function (_$compile_) {
      $compile = _$compile_;

      defaultSrc = "";
    });
  };

  var initializeDirective = function() {
    inject(function (_$rootScope_) {
      $scope = _$rootScope_.$new();

      element = angular.element("<default-src default-src=\"defaultSrc\"></default-src>");
      directive = $compile(element)($scope);

      $scope.defaultSrc = defaultSrc;

      $scope.$digest();
    });
  };

  beforeEach(function() {
    module("core");
    module("sage");
    module("templates");

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
    // @todo determine how to test attrs.$observe and implement tests here.
    /*
    it("should work observe src changes", function () {
      defaultSrc = "example.png";

      initializeDirective();
    });
    */
  });

});
