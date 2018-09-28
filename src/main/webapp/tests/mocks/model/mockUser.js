var mockUser1 = {
  "lastName": "Daniels",
  "firstName": "Jack",
  "uin": "123456789",
  "exp": "1425393875282",
  "email": "aggieJack@library.tamu.edu",
  "role": "ROLE_ADMIN",
  "netId": "aggieJack"
};

var mockUser2 = {
  "lastName": "Daniels",
  "firstName": "Jill",
  "uin": "987654321",
  "exp": "1425393875282",
  "email": "aggieJill@library.tamu.edu",
  "role": "ROLE_USER",
  "netId": "aggieJill"
};

var mockUser3 = {
  "lastName": "Smith",
  "firstName": "Jacob",
  "uin": "192837465",
  "exp": "1425393875282",
  "email": "jsmith@library.tamu.edu",
  "role": "ROLE_USER",
  "netId": "jsmith"
};

angular.module('mock.user', []).service('User', function ($q) {
  return function () {
    var defer;
    var payloadResponse = function (payload) {
      return defer.resolve({
        body: angular.toJson({
          meta: {
            status: 'SUCCESS'
          },
          payload: payload
        })
      });
    };

    this.isDirty = false;

    this.mock = function(toMock) {
      this.lastName = toMock.lastName;
      this.firstName = toMock.firstName;
      this.uin = toMock.uin;
      this.exp = toMock.exp;
      this.email = toMock.email;
      this.role = toMock.role;
      this.netId = toMock.netId;
    };

    this.save = function() {
      defer = $q.defer();
      payloadResponse();
      return defer.promise;
    };

    this.delete = function() {
      defer = $q.defer();
      payloadResponse();
      return defer.promise;
    };

    this.dirty = function(boolean) {
      this.isDirty = boolean;
    };

    this.reload = function() {
    };

    this.clearValidationResults = function () {
    };

    return this;
  };
});
