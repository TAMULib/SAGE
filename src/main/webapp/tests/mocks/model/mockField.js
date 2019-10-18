var dataField1 = {
  id: 1,
  name: "Field 1",
  schemaMapping: "schemaMapping"
};

var dataField2 = {
  id: 2,
  name: "Field 2",
  schemaMapping: "schemaMapping"
};

var dataField3 = {
  id: 3,
  name: "Field 3",
  schemaMapping: "schemaMapping"
};

var mockField = function($q) {
  var model = mockModel("Field", $q, dataField1);

  return model;
};

angular.module("mock.field", []).service("Field", mockField);
