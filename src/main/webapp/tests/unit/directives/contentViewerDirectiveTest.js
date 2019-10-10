describe("directive: contentviewer", function () {
  var $compile, $scope, appConfig, directive, element, contentType, resource;

  var initializeVariables = function() {
    inject(function (_$compile_, _appConfig_) {
      $compile = _$compile_;
      appConfig = _appConfig_;

      contentType = "";
      resource = "";
    });
  };

  var initializeDirective = function() {
    inject(function (_$rootScope_) {
      $scope = _$rootScope_.$new();

      element = angular.element("<contentviewer resource=\"resource\" content-type=\"contentType\"></contentviewer>");
      directive = $compile(element)($scope);

      $scope.contentType = contentType;
      $scope.resource = resource;

      $scope.$digest();
    });
  };

  beforeEach(function() {
    module("core");
    module("sage");
    module('templates');

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
    it("should work with a default viewer", function () {
      contentType = "image/png";

      initializeDirective();
      expect(directive).toBeDefined();
    });

    it("should work with a seadragon viewer", function () {
      contentType = "image/jp2";

      initializeDirective();
      expect(directive).toBeDefined();
    });
  });

});
