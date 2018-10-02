describe('model: Writer', function () {
  var rootScope, scope, WsApi, Writer;

  beforeEach(function() {
    module('core');
    module('sage');
    module('mock.wsApi');

    inject(function ($rootScope, _WsApi_, HttpMethodVerbs, _Writer_) {
      rootScope = $rootScope;
      scope = $rootScope.$new();
      WsApi = _WsApi_;

      Writer = _Writer_;
    });
  });

  describe('Is the model defined', function () {
    it('should be defined', function () {
      expect(Writer).toBeDefined();
    });
  });

  describe('Initialization should return Writer', function() {
    it('the Writer was returned', function() {
      var model = new Writer();
      expect(typeof model).toEqual("object");
    });
  });

});
