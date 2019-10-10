describe("filter: removeBrackets", function () {
  var filter, scope;

  var initializeVariables = function() {
  };

  var initializeFilter = function(settings) {
    inject(function ($filter, $rootScope) {
      scope = $rootScope.$new();

      filter = $filter('removeBrackets');
    });
  };

  beforeEach(function() {
    module("core");
    module("sage");

    installPromiseMatchers();
    initializeVariables();
    initializeFilter();
  });

  describe("Is the filter defined", function () {
    it("should be defined", function () {
      expect(filter).toBeDefined();
    });
  });

  describe("Does the filter work as expected", function () {
    it("should return nothing on empty input", function () {
      var result;

      result = filter("", "");

      expect(result).toBe("");
    });

    it("should remove [ and ]", function () {
      var result;

      // @fixme filter needs to be fixed, as it makes some assumptions on brackets structure.
      //       should the filter only remove the wrapping [ ]?
      //result = filter("][brackets[[]]");
      //result = filter("][[brackets]");
      result = filter("[brackets]");

      expect(result).toBe("brackets");
    });

    it("should not do anything when there are no [ or ]", function () {
      var result;

      result = filter("no brackets");

      expect(result).toBe("no brackets");
    });
  });
});
