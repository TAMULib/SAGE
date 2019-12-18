describe("filter: convertBracketsToButtons", function () {
  var $scope, filter;

  var initializeVariables = function () {
  };

  var initializeFilter = function (settings) {
    inject(function (_$filter_, _$rootScope_) {
      $scope = _$rootScope_.$new();

      filter = _$filter_("convertBracketsToButtons");
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

      result = filter("");

      expect(result).toBe("");
    });

    it("convert {{ and }}", function () {
      var result;

      result = filter("{{content}}");

      expect(result).toBe("<span class='btn btn-small btn-default'>content</span>");
    });

    it("not convert when there is no {{ or }}", function () {
      var result;

      result = filter("{content}");

      expect(result).toBe("{content}");
    });
  });
});
