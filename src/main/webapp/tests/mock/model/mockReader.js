var dataReader1 = {
  id: 1,
  name: "Reader 1",
  source: {
    id: 1,
    name: "Source 1",
    uri: "http://localhost:8983/solr/collection1",
    username: null
  },
  fields: [],
  sortTitle: "title",
  sortId: "id"
};

var dataReader2 = {
  id: 2,
  name: "Reader 2",
  source: {
    id: 2,
    name: "Source 2",
    uri: "http://localhost:8983/solr/collection2",
    username: null
  },
  fields: [],
  sortTitle: "title",
  sortId: "id"
};

var dataReader3 = {
  id: 3,
  name: "Reader 3",
  source: {
    id: 3,
    name: "Source 3",
    uri: "http://localhost:8983/solr/collection3",
    username: "4253938752821"
  },
  fields: [],
  sortTitle: "title",
  sortId: "id"
};

var mockReader = function($q) {
  var model = mockModel("Reader", $q, dataReader1);

  return model;
};

angular.module("mock.reader", []).service("Reader", mockReader);
