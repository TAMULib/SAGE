var dataOperator1 = {
  id: 1,
  type: "DEFAULT_OP",
  name: "Default Thumbnail",
  field: "thumbnail",
  value: "https://brandguide.tamu.edu/assets/downloads/logos/TAM-Logo.png"
};

var dataOperator2 = {
  id: 2,
  type: "CONSTANT_OP",
  name: "Organization",
  field: "organization",
  value: "TAMU"
};

var dataOperator3 = {
  id: 3,
  type: "DFAULT_OP",
  name: "Default Language",
  field: "language",
  value: "English"
};

var mockOperator = function($q) {
  var model = mockModel("Operator", $q, dataOperator1);

  return model;
};

angular.module("mock.operator", []).service("Operator", mockOperator);
