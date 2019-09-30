var dataDiscoveryContext1 = {
  id: 1
};

var dataDiscoveryContext2 = {
  id: 2
};

var dataDiscoveryContext3 = {
  id: 3
};

var mockDiscoveryContext = function($q) {
  var model = mockModel("DiscoveryContext", $q, dataDiscoveryContext1);

  model.ready = function() {
    return $q.defer().promise;
  };

  return model;
};

angular.module("mock.discoveryContext", []).service("DiscoveryContext", mockDiscoveryContext);
