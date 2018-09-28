var mockOutputMappings1 = [
  {
    "id": 1,
    "inputField": "title",
    "mappings": ["title"]
  },
  {
    "id": 2,
    "inputField": "creator",
    "mappings": ["creator"]
  },
  {
    "id": 3,
    "inputField": "created",
    "mappings": ["created"]
  },
  {
    "id": 4,
    "inputField": "subject",
    "mappings": ["subject"]
  },
  {
    "id": 5,
    "inputField": "format",
    "mappings": ["format"]
  },
  {
    "id":6,
    "inputField": "language",
    "mappings": ["language"]
  },
  {
    "id":7,
    "inputField": "terms.identifier",
    "mappings": ["id"]
  }
];

var mockWriter1 = {
  "id": 1,
  "name": "Writer 1",
  "source": {
    "id": 1,
    "name": "Local Solr",
    "uri": "http://localhost:8983/solr/collection1",
    "username": null
  },
  "outputMappings": mockOutputMappings1
};

var mockWriter2 = {
  "id": 2,
  "name": "Writer 2",
  "source": {
    "id": 2,
    "name": "Source 2",
    "uri": "http://localhost:8983/solr/collection2",
    "username": null
  },
  "outputMappings": mockOutputMappings1
};

var mockWriter3 = {
  "id": 3,
  "name": "Test 3",
  "source": {
    "id": 3,
    "name": "Source 3",
    "uri": "http://localhost:8983/solr/collection3",
    "username": "4253938752821"
  },
  "outputMappings": mockOutputMappings1
};

angular.module('mock.writer', []).service('Writer', function ($q) {
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
      this.outputMappings = toMock.outputMappings;
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
