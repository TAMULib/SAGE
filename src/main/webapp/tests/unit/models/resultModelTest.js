describe('model: Result', function () {
  var model, rootScope, scope, location, WsApi;

  var initializeVariables = function(settings) {
    inject(function ($location, $rootScope, _WsApi_) {
      location = $location;
      rootScope = $rootScope;

      WsApi = _WsApi_;
    });
  };

  var initializeModel = function(settings) {
    inject(function (Result) {
      scope = rootScope.$new();

      model = angular.extend(new Result(), dataResult1);

      // ensure that all pre-processing is called.
      if (!scope.$$phase) {
        scope.$digest();
      }
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

  describe('Are the model methods defined', function () {
    it('getValue should be defined', function () {
      expect(model.getValue).toBeDefined();
      expect(typeof model.getValue).toEqual("function");
    });
  });

  describe('Are the model methods working as expected', function () {
    it('getValue should work', function () {
      var response;

      model.fields = { mockKey: "mock value" };

      response = model.getValue("mockKey");
      expect(response).toBe(model.fields.mockKey);

      response = model.getValue("does not exist");
      expect(response).not.toBeDefined();
    });
  });
});
