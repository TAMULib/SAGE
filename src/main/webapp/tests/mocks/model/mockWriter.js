var dataWriter1 = {
  id: 1,
  name: "Writer 1",
  source: {
    id: 1,
    name: "Local Solr",
    uri: "http://localhost:8983/solr/collection1",
    username: null
  },
  outputMappings: [
    {
      id: 1,
      inputField: "title",
      mappings: ["title"]
    },
    {
      id: 2,
      inputField: "creator",
      mappings: ["creator"]
    },
    {
      id: 3,
      inputField: "created",
      mappings: ["created"]
    },
    {
      id: 4,
      inputField: "subject",
      mappings: ["subject"]
    },
    {
      id: 5,
      inputField: "format",
      mappings: ["format"]
    },
    {
      id: 6,
      inputField: "language",
      mappings: ["language"]
    },
    {
      id: 7,
      inputField: "terms.identifier",
      mappings: ["id"]
    }
  ]
};

var dataWriter2 = {
  id: 2,
  name: "Writer 2",
  source: {
    id: 2,
    name: "Source 2",
    uri: "http://localhost:8983/solr/collection2",
    username: null
  },
  outputMappings: dataWriter1.outputMappings
};

var dataWriter3 = {
  id: 3,
  name: "Test 3",
  source: {
    id: 3,
    name: "Source 3",
    uri: "http://localhost:8983/solr/collection3",
    username: "4253938752821"
  },
  outputMappings: []
};

var mockWriter = function($q) {
  var model = mockModel("Writer", $q, dataWriter1);

  return model;
};

angular.module("mock.writer", []).service("Writer", mockWriter);
