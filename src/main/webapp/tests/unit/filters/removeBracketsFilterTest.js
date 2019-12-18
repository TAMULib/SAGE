describe("filter: removeBrackets", function () {
  var $scope, filter;

  var initializeVariables = function () {
  };

  var initializeFilter = function (settings) {
    inject(function (_$filter_, _$rootScope_) {
      $scope = _$rootScope_.$new();

      filter = _$filter_("removeBrackets");
    });
  };

  beforeEach(function () {
    module("core");
    module("sage");

    installPromiseMatchers();
    initializeVariables();
    initializeFilter();
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

    it("remove [ and ]", function () {
      var result;

      // @fixme filter needs to be fixed, as it makes some assumptions on brackets structure.
      //       should the filter only remove the wrapping [ ]?
      //result = filter("][brackets[[]]");
      //result = filter("][[brackets]");
      result = filter("[brackets]");

      expect(result).toBe("brackets");
    });

    it("not do anything when there are no [ or ]", function () {
      var result;

      result = filter("no brackets");

      expect(result).toBe("no brackets");
    });
  });
});
