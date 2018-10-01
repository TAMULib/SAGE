describe('model: Job', function () {
  var rootScope, scope, WsApi, Job;

  beforeEach(function() {
    module('core');
    module('sage');
    module('mock.wsApi');

    inject(function ($rootScope, _WsApi_, HttpMethodVerbs, _Job_) {
      rootScope = $rootScope;
      scope = $rootScope.$new();
      WsApi = _WsApi_;

      Job = _Job_;
    });
  });

  describe('Is the model defined', function () {
    it('should be defined', function () {
      expect(Job).toBeDefined();
    });
  });

  describe('Initialization should return Job', function() {
    it('the Job was returned', function() {
      var model = new Job();
      expect(typeof model).toEqual("object");
    });
  });

});
