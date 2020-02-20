angular.module("mock.assumedControl", []).service("AssumedControl", function ($q) {
  var service = mockService($q);

  service.mockedCallbacks = [];
  service.mockedPromise = undefined;
  service.mockedData = undefined;
  service.mockedAssumed = false;
  service.mockedAssuming = false;

  service.addCallback = function (callback) {
    service.mockedCallbacks.push(callback);
  };

  service.assume = function (user) {
    // @todo
  };

  service.cancel = function () {
    service.set({
      netid: "",
      button: "Assume User",
      status: ""
    });
  };

  service.get = function (data) {
    service.mockedPromise = $q.defer();

    if (service.mockedData) {
      service.mockedPromise.resolve();
    } else {
      service.mockedData = {};
    }

    return service.mockedData;
  };

  service.ready = function () {
    return service.mockedPromise;
  };

  service.set = function (data) {
    angular.extend(service.mockedData, data);
    service.mockedPromise.resolve();
  };

  service.unassume = function (user) {
    // @todo
  };

  return service;
});
