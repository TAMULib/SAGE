var dataReaderRepo1 = [
  dataReader1,
  dataReader2,
  dataReader3
];

var dataReaderRepo2 = [
  dataReader3,
  dataReader2,
  dataReader1
];

var dataReaderRepo3 = [
  dataReader1,
  dataReader3,
  dataReader2
];

angular.module("mock.readerRepo", []).service("ReaderRepo", function($q) {
  var repo = mockRepo("ReaderRepo", $q, mockReader, dataReaderRepo1);

  repo.scaffold = {
    fields: [],
    filter: "*:*",
    name: "",
    source: {}
  };

  repo.getTypes = function () {
    return [
      {
        name: "DEFAULT_OP",
        entity: "DefaultOp"
      },
      {
        name: "CONSTANT_OP",
        entity: "ConstantOp"
      }
    ];
  };

  return repo;
});
