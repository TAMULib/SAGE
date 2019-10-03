describe('model: DiscoveryContext', function () {
  var model, rootScope, scope, location, WsApi;

  var initializeVariables = function(settings) {
    inject(function ($q, $location, $rootScope, _WsApi_) {
      location = $location;
      q = $q;
      rootScope = $rootScope;

      WsApi = _WsApi_;
    });
  };

  var initializeModel = function(settings) {
    inject(function (DiscoveryContext) {
      scope = rootScope.$new();

      model = angular.extend(new DiscoveryContext(), dataDiscoveryContext1);
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
    it('clearBadges should be defined', function () {
      expect(model.clearBadges).toBeDefined();
      expect(typeof model.clearBadges).toEqual("function");
    });

    it('clearSearch should be defined', function () {
      expect(model.clearSearch).toBeDefined();
      expect(typeof model.clearSearch).toEqual("function");
    });

    it('executeSearch should be defined', function () {
      expect(model.executeSearch).toBeDefined();
      expect(typeof model.executeSearch).toEqual("function");
    });

    it('isSearching should be defined', function () {
      expect(model.isSearching).toBeDefined();
      expect(typeof model.isSearching).toEqual("function");
    });

    it('reload should be defined', function () {
      expect(model.reload).toBeDefined();
      expect(typeof model.reload).toEqual("function");
    });

    it('removeFilter should be defined', function () {
      expect(model.removeFilter).toBeDefined();
      expect(typeof model.removeFilter).toEqual("function");
    });

    it('setSearchField should be defined', function () {
      expect(model.setSearchField).toBeDefined();
      expect(typeof model.setSearchField).toEqual("function");
    });
  });

  describe('Are the model methods working as expected', function () {
    it('clearBadges should work', function () {
      var payload = {
        payload: {
          DiscoveryContext: {}
        }
      };

      WsApi.fetch = function() {
        return payloadPromise(q.defer(), payload);
      };

      spyOn(model, 'executeSearch');

      //model.clearBadges();
      //scope.$digest();

      //expect(model.executeSearch).toHaveBeenCalled();
    });

    it('clearSearch should work', function () {
      var payload = {
        payload: {
          DiscoveryContext: {}
        }
      };

      WsApi.fetch = function() {
        return payloadPromise(q.defer(), payload);
      };

      spyOn(model, 'executeSearch');

      //model.clearSearch();
      //scope.$digest();

      //expect(model.executeSearch).toHaveBeenCalled();
    });

    it('executeSearch should work', function () {
      var payload = {
        payload: {
          DiscoveryContext: {}
        }
      };

      WsApi.fetch = function() {
        return payloadPromise(q.defer(), payload);
      };

      spyOn(location, 'search');

      // @todo: more work needed here.
      //model.executeSearch();
      //scope.$digest();

      //expect(location.search).toHaveBeenCalled();
    });

    it('isSearching should work', function () {
      var payload = {
        payload: {
          DiscoveryContext: {}
        }
      };

      WsApi.fetch = function() {
        return payloadPromise(q.defer(), payload);
      };

      // @todo
      //model.isSearching();
      //scope.$digest();
    });

    it('reload should work', function () {
      var payload = {
        payload: {
          DiscoveryContext: {}
        }
      };

      WsApi.fetch = function() {
          return payloadPromise(q.defer(), payload);
      };

      // @todo
      //model.reload();
      //scope.$digest();
    });

    it('removeFilter should work', function () {
      var payload = {
        payload: {
          DiscoveryContext: {}
        }
      };

      WsApi.fetch = function() {
        return payloadPromise(q.defer(), payload);
      };

      // @todo
      //model.removeFilter();
      //scope.$digest();
    });

    it('setSearchField should work', function () {
      // todo: spyOn(WsApi, "fetch").and.returnValue(defer.promise);
      var payload = {
        payload: {
          DiscoveryContext: {}
        }
      };

      WsApi.fetch = function() {
        return payloadPromise(q.defer(), payload);
      };

      // @todo
      //model.setSearchField();
      //scope.$digest();
    });
  });

});
