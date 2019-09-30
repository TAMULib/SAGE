var dataSource1 = {
  id: 1,
  name: "Source 1",
  uri: "cap.library.tamu.edu",
  username: null,
  password: null,
  readOnly: false
};

var dataSource2 = {
  id: 2,
  name: "Source 2",
  uri: "cap.library.tamu.edu",
  username: null,
  password: null,
  readOnly: false
};

var dataSource3 = {
  id: 3,
  name: "Source 3",
  uri: "cap.library.tamu.edu",
  username: "4253938752821",
  password: "1425393875282",
  readOnly: false
};

var mockSource = function($q) {
  var model = mockModel("Source", $q, dataSource1);

  return model;
};

angular.module("mock.source", []).service("Source", mockSource);
