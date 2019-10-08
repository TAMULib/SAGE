describe('model: MetadataField', function () {
  var model, rootScope, scope, WsApi;

  var initializeVariables = function(settings) {
    inject(function ($rootScope, _WsApi_) {
      rootScope = $rootScope;

      WsApi = _WsApi_;
    });
  };

  var initializeModel = function(settings) {
    inject(function (MetadataField) {
      scope = rootScope.$new();

      model = angular.extend(new MetadataField());
    });
  };

  beforeEach(function() {
    module("core");
    module("sage");
    module("mock.wsApi");

    initializeVariables();
    initializeModel();
  });

  describe('Is the model defined', function () {
    it('should be defined', function () {
      expect(model).toBeDefined();
    });
  });
});
