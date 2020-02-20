var dataFilter1 = {
  id: 1,
  key: "key1",
  label: "Filter 1",
  value: "Value 1"
};

var dataFilter2 = {
  id: 2,
  key: "key2",
  label: "Filter 2",
  value: "Value 2"
};

var dataFilter3 = {
  id: 3,
  key: "key1",
  label: "Filter 3, with key1",
  value: "Value 3"
};

var mockFilter = function ($q) {
  var model = mockModel("Filter", $q, dataFilter1);

  return model;
};

angular.module("mock.filter", []).service("Filter", mockFilter);
