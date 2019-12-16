var dataInternalMetadata1 = {
  id: 1,
  gloss: "Id",
  field: "id",
  required: true
};

var dataInternalMetadata2 = {
  id: 2,
  gloss: "Title",
  field: "title",
  required: true
};

var dataInternalMetadata3 = {
  id: 3,
  gloss: "Description",
  field: "description",
  required: false
};

var mockInternalMetadata = function($q) {
  var model = mockModel("InternalMetadata", $q, dataInternalMetadata1);

  return model;
};

angular.module("mock.internalMetadata", []).service("InternalMetadata", mockInternalMetadata);

