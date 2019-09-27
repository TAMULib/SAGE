var dataNgTableParams1 = {
  id: 1,
  data: []
};

var dataNgTableParams2 = {
  id: 2,
  data: []
};

var dataNgTableParams3 = {
  id: 3,
  data: []
};

var mockNgTableParams = function($q) {
  var model = mockModel("NgTableParams", $q, dataNgTableParams1);

  model._settings = {
    counts: [],
    total: 0,
    getData: function(params) {
      return model.data;
    }
  };

  model.count = function() {
    return model._settings.total;
  };

  model.sorting = function(sort) {
    return {};
  };

  model.page = function(sort) {
    return {};
  };

  return model;
};

angular.module("mock.ngTableParams", []).service("NgTableParams", mockNgTableParams);

