describe('model: Source', function () {
  var model, rootScope, scope, WsApi;

  var initializeVariables = function(settings) {
    inject(function ($rootScope, _WsApi_) {
      rootScope = $rootScope;

      WsApi = _WsApi_;
    });
  };

  var initializeModel = function(settings) {
    inject(function (Source) {
      scope = rootScope.$new();

      model = angular.extend(new Source());
    });
  };

  beforeEach(function() {
    module('core');
    module('sage');
    module('mock.wsApi');

    initializeVariables();
    initializeModel();
  });

  describe('Is the model defined', function () {
    it('should be defined', function () {
      expect(model).toBeDefined();
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
    // @todo
  });
});
