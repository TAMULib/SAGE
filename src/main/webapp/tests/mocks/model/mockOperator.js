var mockOperator1 = {
  "id": 1,
  "type": "DEFAULT_OP",
  "name": "Default Thumbnail",
  "field": "thumbnail",
  "value": "https://brandguide.tamu.edu/assets/downloads/logos/TAM-Logo.png"
};

var mockOperator2 = {
  "id": 2,
  "type": "CONSTANT_OP",
  "name": "Organization",
  "field": "organization",
  "value": "TAMU"
};

var mockOperator3 = {
  "id": 3,
  "type": "DFAULT_OP",
  "name": "Default Language",
  "field": "language",
  "value": "English"
};

angular.module('mock.operator', []).service('Operator', function ($q) {
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
      this.source = toMock.source;
      this.fields = toMock.fields;
      this.sortTitle = toMock.sortTitle;
      this.sortId = toMock.sortId;
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

    this.refresh = function() {

    };

    this.reload = function() {

    };

    this.clearValidationResults = function() {

    };

    this.getShadow = function() {
      return angular.copy(this);
    }

    return this;
  };
});

