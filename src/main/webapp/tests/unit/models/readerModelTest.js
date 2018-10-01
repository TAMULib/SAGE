describe('model: Reader', function () {
  var rootScope, scope, WsApi, Reader;

  beforeEach(function() {
    module('core');
    module('sage');
    module('mock.wsApi');

    inject(function ($rootScope, _WsApi_, HttpMethodVerbs, _Reader_) {
      rootScope = $rootScope;
      scope = $rootScope.$new();
      WsApi = _WsApi_;

      Reader = _Reader_;
    });
  });

  describe('Is the model defined', function () {
    it('should be defined', function () {
      expect(Reader).toBeDefined();
    });
  });

  describe('Initialization should return Reader', function() {
    it('the Reader was returned', function() {
      var model = new Reader();
      expect(typeof model).toEqual("object");
    });
  });

});
