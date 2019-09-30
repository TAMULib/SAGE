var dataUser1 = {
  anonymous: false,
  email: "aggieJack@library.tamu.edu",
  exp: "1425393875282",
  firstName: "Jack",
  lastName: "Daniels",
  netId: "aggieJack",
  role: "ROLE_ADMIN",
  uin: "123456789"
};

var dataUser2 = {
  anonymous: false,
  email: "aggieJill@library.tamu.edu",
  exp: "1425393875282",
  firstName: "Jill",
  lastName: "Daniels",
  netId: "aggieJill",
  role: "ROLE_STUDENT",
  uin: "987654321"
};

var dataUser3 = {
  anonymous: false,
  email: "jsmith@library.tamu.edu",
  exp: "1425393875282",
  firstName: "Jacob",
  lastName: "Smith",
  netId: "jsmith",
  role: "ROLE_STUDENT",
  uin: "192837465"
};

var mockUser = function($q) {
  var model = mockModel("User", $q, dataUser1);

  model.getMapping = function() {
    // @todo
    return [];
  };

  return model;
};

angular.module("mock.user", []).service("User", mockUser);
