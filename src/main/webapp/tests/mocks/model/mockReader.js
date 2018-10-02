var mockFields1 = [
  {
    "id": 1,
    "name": "title",
    "schemaMapping":"title"
  },
  {
    "id": 2,
    "name": "creator",
    "schemaMapping": "creator"
  },
  {
    "id": 3,
    "name": "created",
    "schemaMapping":"created"
  },
  {
    "id": 4,
    "name": "subject",
    "schemaMapping": "subject"
  },
  {
    "id": 5,
    "name": "format",
    "schemaMapping": "format"
  },
  {
    "id": 6,
    "name": "language",
    "schemaMapping": "language"
  },
  {
    "id": 7,
    "name": "id",
    "schemaMapping": "terms.identifier"
  }
];

var mockReader1 = {
  "id": 1,
  "name": "Reader 1",
  "source": {
    "id": 1,
    "name": "Source 1",
    "uri": "http://localhost:8983/solr/collection1",
    "username": null
  },
  "fields": mockFields1,
  "sortTitle": "title",
  "sortId": "id"
};

var mockReader2 = {
  "id": 2,
  "name": "Reader 2",
  "source": {
    "id": 2,
    "name": "Source 2",
    "uri": "http://localhost:8983/solr/collection2",
    "username": null
  },
  "fields": mockFields1,
  "sortTitle": "title",
  "sortId": "id"
};

var mockReader3 = {
  "id": 3,
  "name": "Reader 3",
  "source": {
    "id": 3,
    "name": "Source 3",
    "uri": "http://localhost:8983/solr/collection3",
    "username": "4253938752821"
  },
  "fields": mockFields1,
  "sortTitle": "title",
  "sortId": "id"
};

angular.module('mock.reader', []).service('Reader', function ($q) {
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

    this.reload = function() {
    };

    this.clearValidationResults = function() {
    };

    return this;
  };
});

