var dataWriterRepo1 = [
  dataWriter1,
  dataWriter2,
  dataWriter3
];

var dataWriterRepo2 = [
  dataWriter3,
  dataWriter2,
  dataWriter1
];

var dataWriterRepo3 = [
  dataWriter1,
  dataWriter3,
  dataWriter2
];

angular.module("mock.writerRepo", []).service("WriterRepo", function ($q) {
  var repo = mockRepo("WriterRepo", $q, mockWriter, dataWriterRepo1);

  repo.scaffold = {
    name: ""
  };

  return repo;
});
