var dataMetadataField1 = {
  id: 1,
  inGrid: true,
  inList: true,
  inSingleResult: true,
  key: "metadata_field_1",
  label: "Metadata Field 1",
  sortable: true,
  type: ""
};

var dataMetadataField2 = {
  id: 2,
  inGrid: false,
  inList: false,
  inSingleResult: false,
  key: "metadata_field_2",
  label: "Metadata Field 2",
  sortable: false,
  type: ""
};

var dataMetadataField3 = {
  id: 3,
  inGrid: false,
  inList: false,
  inSingleResult: true,
  key: "metadata_field_3",
  label: "Metadata Field 3",
  sortable: true,
  type: ""
};

var mockMetadataField = function($q) {
  var model = mockModel("MetadataField", $q, dataMetadataField1);

  return model;
};

angular.module("mock.metadataField", []).service("MetadataField", mockMetadataField);
