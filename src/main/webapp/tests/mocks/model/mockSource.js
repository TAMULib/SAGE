var mockSource1 = {
  "id": 1,
  "name": "Source 1",
  "uri": "cap.library.tamu.edu",
  "username": null,
  "password": null,
  "readOnly": false
};

var mockSource2 = {
  "id": 2,
  "name": "Source 2",
  "uri": "cap.library.tamu.edu",
  "username": null,
  "password": null,
  "readOnly": false
};

var mockSource3 = {
  "id": 3,
  "name": "Source 3",
  "uri": "cap.library.tamu.edu",
  "username": "4253938752821",
  "password": "1425393875282",
  "readOnly": false
};

angular.module('mock.source', []).service('Source', function ($q) {
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
      this.id = toMock.id;
      this.name = toMock.name;
      this.uri = toMock.uri;
      this.username = toMock.username;
      this.password = toMock.password;
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

    this.clearValidationResults = function() {
    };

    return this;
  };
});
