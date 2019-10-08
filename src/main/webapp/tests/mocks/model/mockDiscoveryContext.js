var dataDiscoveryContext1 = {
  id: 1,
  search: {
    field: "all_fields",
    value: "",
    filters: [],
    start: 0,
    total: 0,
    page: {
      number: 0,
      size: 10,
      sort: "id",
      offset: 0
    }
  }
};

var dataDiscoveryContext2 = {
  id: 2,
  search: {
    field: "",
    value: "",
    filters: [],
    start: 0,
    total: 0,
    page: {
      number: 0,
      size: 10,
      sort: "id",
      offset: 0
    }
  }
};

var dataDiscoveryContext3 = {
  id: 3,
  search: {
    field: "",
    value: "",
    filters: [],
    start: 0,
    total: 0,
    page: {
      number: 0,
      size: 10,
      sort: "",
      offset: 0
    }
  }
};

var mockDiscoveryContext = function($q) {
  var model = mockModel("DiscoveryContext", $q, dataDiscoveryContext1);

  model.mockRouteParams = {};
  model.mockSearching = false;

  model.addFilter = function(label, key, value) {
    var filter = {
      label: label,
      key: key,
      value: value
    };

    if (!model.search.filters) {
      model.search.filters = [];
    }

    model.search.filters.push(filter);
    return model.executeSearch();
  };

  model.buildPage = function() {
    var page = {
      number: 0,
      size: 10,
      sort: "id",
      offset: 0
    };

    return page;
  };

  model.executeSearch = function(maintainPage) {
    return $q(function(resolve) {
      resolve();
    });
  };

  model.isSearching = function() {
    return model.mockSearching;
  };

  model.removeFilter = function(filter) {
    for (var i = 0; i < model.search.filters.length; i++) {
      var f = model.search.filters[i];
      if (f.key === filter.key && f.value === filter.value) {
        model.search.filters.splice(i, 1);
      }
    }
    return model.executeSearch();
  };

  model.resetBadges = function() {
    model.search.filters.length = 0;
    model.search.field = "";
    model.search.value = "";
    model.search.label = "";
    return model.executeSearch();
  };

  model.resetPage = function() {
    model.search.filters.length = 0;
    model.search.field = "";
    model.search.value = "";
    model.search.label = "";
    return model.executeSearch();
  };

  model.resetSearch = function() {
    model.search.field = "";
    model.search.value = "";
    model.search.label = "";
    return model.executeSearch();
  };

  model.setSearchField = function(key, value) {
    model.search.field = key;
    model.search.value = value;
  };

  return model;
};

angular.module("mock.discoveryContext", []).service("DiscoveryContext", mockDiscoveryContext);
