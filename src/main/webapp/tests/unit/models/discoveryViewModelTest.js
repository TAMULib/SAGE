describe('model: DiscoveryView', function () {
  var model, rootScope, routeParams, scope, location, WsApi;

  var initializeVariables = function(settings) {
    inject(function ($location, $rootScope, _WsApi_) {
      location = $location;
      rootScope = $rootScope;

      if (settings && settings.routeParams) {
        angular.extend(routeParams, settings.routeParams);
      }

      WsApi = _WsApi_;
    });
  };

  var initializeModel = function(settings) {
    inject(function (DiscoveryView) {
      scope = rootScope.$new();

      if (settings) {
        if (settings.routeParams) {
          angular.extend(routeParams, settings.routeParams);
        }
      }

      model = angular.extend(new DiscoveryView(), dataDiscoveryView1);

      // ensure that all pre-processing is called.
      if (!scope.$$phase) {
        scope.$digest();
      }
    });
  };

  beforeEach(function() {
    module("core", function($provide) {
      routeParams = {};
      $provide.value("$routeParams", routeParams);
    });
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
