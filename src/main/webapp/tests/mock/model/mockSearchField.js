var dataSearchField1 = {
  id: 1,
  key: "search_field_1",
  label: "Search Field 1"
};

var dataSearchField2 = {
  id: 2,
  key: "search_field_2",
  label: "Search Field 2"
};

var dataSearchField3 = {
  id: 3,
  key: "search_field_3",
  label: "Search Field 3"
};

var mockSearchField = function($q) {
  var model = mockModel("SearchField", $q, dataSearchField1);

  return model;
};

angular.module("mock.searchField", []).service("SearchField", mockSearchField);
