describe("filter: boldMatch", function () {
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

      filter = _$filter_("boldMatch");
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

      result = filter("", "");

      expect(result).toBe("");
    });

    it("add bold tag on match", function () {
      var result;

      result = filter("<div>match</div>", "match");

      expect(result).toBe("<div><b>match</b></div>");
    });

    it("not add bold tag on no match", function () {
      var result;

      result = filter("<div>miss</div>", "match");

      expect(result).toBe("<div>miss</div>");
    });
  });
});
