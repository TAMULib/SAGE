describe("directive: defaultSrc", function () {
  var $compile, $scope, MockedUser, directive, element, defaultSrc;

  var initializeVariables = function () {
    inject(function (_$q_, _$compile_) {
      $q = _$q_;
      $compile = _$compile_;

      MockedUser = new mockUser($q);

      defaultSrc = "";
    });
  };

  var initializeDirective = function (settings) {
    inject(function (_$rootScope_) {
      $scope = _$rootScope_.$new();

      var attr = settings && settings.attr ? settings.attr : "default-src=\"defaultSrc\"";
      var body = settings && settings.body ? settings.body : "";

      element = angular.element("<default-src " + attr + ">" + body + "</default-src>");
      directive = $compile(element)($scope);

      $scope.defaultSrc = defaultSrc;

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

});
