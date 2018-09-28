angular.module('mock.wsApi', []).service('WsApi', function ($q) {
  var defer;

  var payloadResponse = function (payload) {
    return defer.resolve({
      body: angular.toJson({
        meta: {
          status: 'SUCCESS'
        },
        payload: payload
      })
    });
  };

  var messageResponse = function (message) {
    return defer.resolve({
      body: angular.toJson({
        meta: {
          status: 'SUCCESS',
          message: message
        }
      })
    });
  };

  this.fetch = function (apiReq) {
    defer = $q.defer();
    switch (apiReq.controller) {
      default:
    }
    return defer.promise;
  };

  this.listen = function (apiReq) {
      defer = $q.defer();
      return defer.promise;
  };
});
