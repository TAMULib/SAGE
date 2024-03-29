describe("directive: contentviewer", function () {
  var $compile, $scope, MockedUser, appConfig, directive, element, contentType, resource;

  var initializeVariables = function (settings) {
    inject(function (_$q_, _$compile_, _appConfig_) {
      $q = _$q_;
      $compile = _$compile_;
      appConfig = _appConfig_;

      MockedUser = new mockUser($q);

      contentType = "";
      context = {};
    });
  };

  var initializeDirective = function (settings) {
    inject(function (_$rootScope_) {
      $scope = _$rootScope_.$new();

      var attr = settings && settings.attr ? settings.attr : "context=\"context\" content-type=\"contentType\"";
      var body = settings && settings.body ? settings.body : "";

      element = angular.element("<contentviewer " + attr + ">" + body + "</contentviewer>");
      directive = $compile(element)($scope);

      $scope.contentType = contentType;
      $scope.context = {
        resourceLocationUri: resource
      };

      $scope.$digest();
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

  describe("Is the directive", function () {
    it("defined", function () {
      initializeDirective();
      expect(directive).toBeDefined();
    });
  });

  describe("Does the directive", function () {
    it("work with a default viewer", function () {
      contentType = "image/png";

      initializeDirective();
      expect(directive).toBeDefined();
    });

    it("work with a seadragon viewer", function () {
      contentType = "image/jp2";

      initializeDirective();
      expect(directive).toBeDefined();
    });
  });

});
