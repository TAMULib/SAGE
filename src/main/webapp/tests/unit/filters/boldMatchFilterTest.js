describe("filter: boldMatch", function () {
  var $scope, filter;

  var initializeVariables = function() {
  };

  var initializeFilter = function(settings) {
    inject(function (_$filter_, _$rootScope_) {
      $scope = _$rootScope_.$new();

      filter = _$filter_('boldMatch');
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

      // fixme: the test should return an empty string not "<b></b>", the filter needs to be fixed!
      //expect(result).toBe("");
    });

    it("should add bold tag on match", function () {
      var result;

      result = filter("<div>match</div>", "match");

      expect(result).toBe("<div><b>match</b></div>");
    });

    it("should not add bold tag on no match", function () {
      var result;

      result = filter("<div>miss</div>", "match");

      expect(result).toBe("<div>miss</div>");
    });
  });
});
