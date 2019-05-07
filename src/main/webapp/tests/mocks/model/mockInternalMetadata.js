var mockInternalMetadatum1 = {
  "id": 1,
  "gloss": "Id",
  "field": "id",
  "required": true
};

var mockInternalMetadatum2 = {
  "id": 2,
  "gloss": "Title",
  "field": "title",
  "required": true
};

var mockInternalMetadatum3 = {
  "id": 3,
  "gloss": "Description",
  "field": "description",
  "required": false
};

var mockInternalMetadatum4 = {
  "id": 4,
  "gloss": "Language",
  "field": "language",
  "required": false
};

angular.module('mock.internalMetadata', []).service('InternalMetadata', function ($q) {
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

    return this;
  };
});

