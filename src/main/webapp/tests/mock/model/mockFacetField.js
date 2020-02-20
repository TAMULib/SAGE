var dataFacetField1 = {
  id: 1,
  key: "facet_field_1",
  label: "Facet Field 1",
  type: "",
  widget: ""
};

var dataFacetField2 = {
  id: 2,
  key: "facet_field_2",
  label: "Facet Field 2",
  type: "",
  widget: ""
};

var dataFacetField3 = {
  id: 3,
  key: "facet_field_3",
  label: "Facet Field 3",
  type: "",
  widget: ""
};

var mockFacetField = function ($q) {
  var model = mockModel("FacetField", $q, dataFacetField1);

  return model;
};

angular.module("mock.facetField", []).service("FacetField", mockFacetField);
