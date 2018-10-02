describe('model: AbstractAppModel', function () {
  var rootScope, scope, WsApi, AbstractAppModel;

  beforeEach(function() {
    module('core');
    module('sage');
    module('mock.wsApi');

    inject(function ($rootScope, _WsApi_, HttpMethodVerbs, _AbstractAppModel_) {
      rootScope = $rootScope;
      scope = $rootScope.$new();
      WsApi = _WsApi_;

      AbstractAppModel = _AbstractAppModel_;
    });
  });

  describe('Is the model defined', function () {
    it('should be defined', function () {
      expect(AbstractAppModel).toBeDefined();
    });
  });

  describe('Initialization should return AbstractAppModel', function() {
    it('the AbstractAppModel was returned', function() {
      var model = new AbstractAppModel();
      expect(typeof model).toEqual("object");
    });
  });
});
