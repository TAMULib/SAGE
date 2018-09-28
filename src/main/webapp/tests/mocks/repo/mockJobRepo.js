var mockJobFields = [
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

var mockJobOutputMappings = [
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

var mockJobs = [{
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
        "fields": mockJobFields,
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
        "outputMappings": mockJobOutputMappings
      }
    ]
  },
  {
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
        "fields": mockJobFields,
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
        "outputMappings": mockJobOutputMappings
      }
    ]
  },
  {
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
        "fields": mockJobFields,
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
        "fields": mockJobFields,
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
        "outputMappings": mockJobOutputMappings
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
        "outputMappings": mockJobOutputMappings
      }
    ]
  }
];

angular.module('mock.jobRepo', []).service('JobRepo', function ($q) {
  var jobRepo = this;
  var defer;
  var validations = {};
  var validationResults = {};
  var scaffold = mockJobs[0];

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

  var messageResponse = function (message) {
    return defer.resolve({
      body: angular.toJson({
        meta: {
          status: 'SUCCESS',
          message: message
        }
      })
    });
  };

  jobRepo.list = mockJobs;

  jobRepo.clearValidationResults = function () {
    validationResults = {};
  };

  jobRepo.create = function (job) {
      defer = $q.defer();
      job.id = jobRepo.list.length + 1;
      jobRepo.list.push(angular.copy(job));
      payloadResponse(job);
      return defer.promise;
  };

  jobRepo.contains = function (job) {
    var found = false;
    for (var i in jobRepo.list) {
      if (jobRepo.list[i].id === job.id) {
        found = true;
        break;
      }
    }
    return found;
  };

  jobRepo.delete = function (job) {
    defer = $q.defer();
    for (var i in jobRepo.list) {
      if (jobRepo.list[i].id === job.id) {
        jobRepo.list.splice(i, 1);
        break;
      }
    }
    payloadResponse();
    return defer.promise;
  };

  jobRepo.getAll = function () {
    return angular.copy(jobRepo.list);
  };

  jobRepo.getScaffold = function(defaults) {
    var updatedScaffold = scaffold;
    if (!defaults) defaults = {};
    angular.extend(updatedScaffold, defaults);
    return updatedScaffold;
  };

  jobRepo.getValidations = function () {
    return angular.copy(validations);
  };

  jobRepo.getValidationResults = function () {
    return angular.copy(validationResults);
  };

  jobRepo.isInScaffold = function(property) {
    var propertyFound = false;
    var scaffoldKeys = Object.keys(scaffold);
    for(var i in scaffoldKeys) {
      var scaffoldProperty = scaffoldKeys[i];
      if(scaffoldProperty === property) {
        propertyFound= true;
        break;
      }
    }
    return propertyFound;
  };

  jobRepo.ready = function () {
    defer = $q.defer();
    payloadResponse();
    return defer.promise;
  };

  jobRepo.update = function (job) {
    defer = $q.defer();
    var updatedJob;
    for (var i in jobRepo.list) {
      if (jobRepo.list[i].id === job.id) {
        updatedJob = angular.copy(jobRepo.list[i]);
        angular.extend(updatedJob, job);
        break;
      }
    }
    payloadResponse(updatedJob);
    return defer.promise;
  };

  return jobRepo;
});
