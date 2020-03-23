var dataSourceRepo1 = [
  dataSource1,
  dataSource2,
  dataSource3
];

var dataSourceRepo2 = [
  dataSource3,
  dataSource2,
  dataSource1
];

var dataSourceRepo3 = [
  dataSource1,
  dataSource3,
  dataSource2
];

angular.module("mock.sourceRepo", []).service("SourceRepo", function ($q) {
  var repo = mockRepo("SourceRepo", $q, mockSource, dataSourceRepo1);

  repo.scaffold = {
    name: "Local Solr",
    uri: "http://localhost:8983/solr/collection1",
    readOnly: true,
    requiresFilter: true,
    username: "",
    password: ""
  };

  repo.getAvailableFields = function () {
    // @todo
    return [];
  };

  repo.getIndexedFields = function () {
    // @todo
    return [];
  };

  repo.getApplicationTypes = function () {
    // @todo
    return [];
  };

  repo.getReadable = function () {
    var readables = [];
    for (var i in repo.list) {
      if (repo.list[i].readOnly === true) {
        readables.push(repo.list[i]);
      }
    }
    return readables;
  };

  repo.getWriteable = function () {
    var writeables = [];
    for (var i in repo.list) {
      if (repo.list[i].readOnly === false) {
        writeables.push(repo.list[i]);
      }
    }
    return writeables;
  };

  return repo;
});
