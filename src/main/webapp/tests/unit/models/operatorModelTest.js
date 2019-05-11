describe('model: Operator', function () {
  var Operator;

  beforeEach(function() {
    module('core');
    module('sage');

    inject(function ($rootScope, _Operator_) {
      rootScope = $rootScope;
      scope = $rootScope.$new();

      Operator = _Operator_;
    });
  });

  describe('Is the model defined', function () {
    it('should be defined', function () {
      expect(Operator).toBeDefined();
    });
  });

  describe('Initialization should return Operator', function() {
    it('the Operator was returned', function() {
      var model = new Operator();
      expect(typeof model).toEqual("object");
    });
  });

});
