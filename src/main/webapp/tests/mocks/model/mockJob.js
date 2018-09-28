var mockJobFields1 = [
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

var mockJobOutputMappings1 = [
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

var mockJob1 = {
  "id": 1,
  "name": "Job 1",
  "readers":[
    {
      "id": 1,
      "name": "Reader 1",
      "source": {
        "id": 1,
        "name": "Source 1",
        "uri": "http://localhost:8983/solr/collection1",
        "username": null
      },
      "fields": mockJobFields1,
      "sortTitle": "title",
      "sortId": "id"
    }
  ],
  "writers":[
    {
      "id": 1,
      "name": "Writer 1",
      "source": {
        "id": 1,
        "name": "Source 1",
        "uri": "http://localhost:8983/solr/collection1",
        "username": null
      },
      "outputMappings": mockJobOutputMappings1
    }
  ]
};

var mockJob2 = {
  "id": 2,
  "name": "Job 2",
  "readers":[
    {
      "id": 1,
      "name": "Reader 1",
      "source": {
        "id": 1,
        "name": "Source 1",
        "uri": "http://localhost:8983/solr/collection1",
        "username": null
      },
      "fields": mockJobFields1,
      "sortTitle": "title",
      "sortId": "id"
    }
  ],
  "writers":[
    {
      "id": 1,
      "name": "Writer 1",
      "source": {
        "id": 1,
        "name": "Source 1",
        "uri": "http://localhost:8983/solr/collection1",
        "username": null
      },
      "outputMappings": mockJobOutputMappings1
    }
  ]
};

var mockJob3 = {
  "id": 3,
  "name": "Job 3",
  "readers":[
    {
      "id": 1,
      "name": "Reader 1",
      "source": {
        "id": 1,
        "name": "Source 1",
        "uri": "http://localhost:8983/solr/collection1",
        "username": null
      },
      "fields": mockJobFields1,
      "sortTitle": "title",
      "sortId": "id"
    },
    {
      "id": 2,
      "name": "Reader 2",
      "source": {
        "id": 2,
        "name": "Source 2",
        "uri": "http://localhost:8983/solr/collection2",
        "username": null
      },
      "fields": mockJobFields1,
      "sortTitle": "title",
      "sortId": "id"
    }
  ],
  "writers":[
    {
      "id": 1,
      "name": "Writer 1",
      "source": {
        "id": 1,
        "name": "Source 1",
        "uri": "http://localhost:8983/solr/collection1",
        "username": null
      },
      "outputMappings": mockJobOutputMappings1
    },
    {
      "id": 2,
      "name": "Writer 2",
      "source": {
        "id": 2,
        "name": "Source 2",
        "uri": "http://localhost:8983/solr/collection2",
        "username": null
      },
      "outputMappings": mockJobOutputMappings1
    }
  ]
};

angular.module('mock.job', []).service('Job', function ($q) {
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
      this.readers = toMock.readers;
      this.writers = toMock.writers;
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
