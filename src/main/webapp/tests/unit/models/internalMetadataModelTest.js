describe('model: InternalMetadata', function () {
  var InternalMetadata;

  beforeEach(function() {
    module('core');
    module('sage');

    inject(function ($rootScope, _InternalMetadata_) {
      rootScope = $rootScope;
      scope = $rootScope.$new();

      InternalMetadata = _InternalMetadata_;
    });
  });

  describe('Is the model defined', function () {
    it('should be defined', function () {
      expect(InternalMetadata).toBeDefined();
    });
  });

  describe('Initialization should return InternalMetadata', function() {
    it('the Reader was returned', function() {
      var model = new InternalMetadata();
      expect(typeof model).toEqual("object");
    });
  });

});
