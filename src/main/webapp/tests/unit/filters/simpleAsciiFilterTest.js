describe("filter: simpleAscii", function () {
  var $scope, MockedUser, filter;

  var initializeVariables = function () {
    inject(function (_$q_) {
      $q = _$q_;

      MockedUser = new mockUser($q);
    });
  };

  var initializeFilter = function (settings) {
    inject(function (_$filter_, _$rootScope_) {
      $scope = _$rootScope_.$new();

      filter = _$filter_("simpleAscii");
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
    initializeFilter();
  });

  afterEach(function () {
    $scope.$destroy();
  });

  describe("Is the filter", function () {
    it("defined", function () {
      expect(filter).toBeDefined();
    });
  });

  describe("Does the filter", function () {
    it("return nothing on empty input", function () {
      var result;

      result = filter("");

      expect(result).toBe("");
    });

    it("all valid characters", function () {
      var result;
      var all = "abcdefghijklmnopqrstuvwxyz";
      all += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      all += "1234567890";
      all += "+-._~";

      result = filter(all);

      expect(result).toBe(all);
    });

    it("without whitespace", function () {
      var result;

      // The character U+200A is between the 'h' and 'i' while U+200D is between the 'i' and 'j'.
      // These may not normally display in a text editor.
      var all = "a b  c\fd e f g h i‍j";

      result = filter(all);

      expect(result).toBe("abcdefghij");
    });

    it("without most symbols", function () {
      var result;
      var all = "a`!@#$%^&*()=b{}[];:'\"\\|,<>/?";

      result = filter(all);

      expect(result).toBe("ab");
    });

    it("skips non-ascii unicode characters", function () {
      var result;
      var all = "a↡b𒆷c𔙃d𔑳↡𒆷𔙃e";

      result = filter(all);

      expect(result).toBe("abcde");
    });
  });
});
