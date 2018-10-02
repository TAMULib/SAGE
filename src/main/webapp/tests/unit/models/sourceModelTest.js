describe('model: Source', function () {
  var rootScope, scope, q, WsApi, Source, model;

  beforeEach(function() {
    module('core');
    module('sage');
    module('mock.wsApi');

    inject(function ($rootScope, $q, _WsApi_, HttpMethodVerbs, _Source_) {
      rootScope = $rootScope;
      scope = $rootScope.$new();
      q = $q;
      WsApi = _WsApi_;

      Source = _Source_;
      model = new Source();
    });
  });

  describe('Is the model defined', function () {
    it('should be defined', function () {
      expect(Source).toBeDefined();
    });
  });

  describe('Initialization should return Source', function() {
    it('the Source was returned', function() {
      expect(typeof model).toEqual("object");
    });
  });

  describe('Are the model methods defined', function () {
    it('testLocation should be defined', function () {
      expect(model.testLocation).toBeDefined();
      expect(typeof model.testLocation).toEqual("function");
    });

    it('testAuthorization should be defined', function () {
      expect(model.testAuthorization).toBeDefined();
      expect(typeof model.testAuthorization).toEqual("function");
    });
  });

  describe('Are the model methods working as expected', function () {
  });

});
