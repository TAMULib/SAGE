var dataSearch1 = {
  id: 1
};

var dataSearch2 = {
  id: 2
};

var dataSearch3 = {
  id: 3
};

var mockSearch = function($q) {
  var model = mockModel("Search", $q, dataSearch1);

  return model;
};

angular.module("mock.search", []).service("Search", mockSearch);
