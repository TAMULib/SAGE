var dataDiscoveryContext1 = {
    id: 1
};

var dataDiscoveryContext2 = {
    id: 2
};

var mockDiscoveryContext3 = {
    id: 3
};

var dataDiscoveryContext4 = {
    id: 4
};

var dataDiscoveryContext5 = {
    id: 5
};

var mockDiscoveryContext6 = {
    id: 6
};

var mockDiscoveryContext = function($q) {
    var model = mockModel("DiscoveryContext", $q, dataDiscoveryContext1);

    model.ready = function() {
      return $q.defer().promise;
    }

    return model;
};

angular.module("mock.discoveryContext", []).service("DiscoveryContext", mockDiscoveryContext);
