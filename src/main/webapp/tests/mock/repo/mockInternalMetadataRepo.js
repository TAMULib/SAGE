var dataInternalMetadataRepo1 = [
  dataInternalMetadata1,
  dataInternalMetadata2,
  dataInternalMetadata3
];

var dataInternalMetadataRepo2 = [
  dataInternalMetadata3,
  dataInternalMetadata2,
  dataInternalMetadata1
];

var dataInternalMetadataRepo3 = [
  dataInternalMetadata1,
  dataInternalMetadata3,
  dataInternalMetadata2
];

angular.module("mock.internalMetadataRepo", []).service("InternalMetadataRepo", function ($q) {
  var repo = mockRepo("InternalMetadataRepo", $q, mockInternalMetadata, dataInternalMetadataRepo1);

  repo.scaffold = {
    gloss: "",
    field: "",
    required: true
  };

  repo.getMetadataFields = function (fields) {
    return payloadPromise($q.defer(), fields);
  };

  return repo;
});
