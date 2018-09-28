var mockOutputMappings = [
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

var mockWriters = [
  {
    "id": 1,
    "name": "Writer 1",
    "source": {
      "id": 1,
      "name": "Local Solr",
      "uri": "http://localhost:8983/solr/collection1",
      "username": null
    },
    "outputMappings": mockOutputMappings
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
    "outputMappings": mockOutputMappings
  },
  {
    "id": 3,
    "name": "Test 3",
    "source": {
      "id": 3,
      "name": "Source 3",
      "uri": "http://localhost:8983/solr/collection3",
      "username": "4253938752821"
    },
    "outputMappings": mockOutputMappings
  }
];

angular.module('mock.writerRepo', []).service('WriterRepo', function ($q) {
  var writerRepo = this;
  var defer;
  var validations = {};
  var validationResults = {};
  var scaffold = mockWriters[0];

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

  writerRepo.list = mockWriters;

  writerRepo.clearValidationResults = function () {
    validationResults = {};
  };

  writerRepo.create = function (writer) {
      defer = $q.defer();
      writer.id = writerRepo.list.length + 1;
      writerRepo.list.push(angular.copy(writer));
      payloadResponse(writer);
      return defer.promise;
  };

  writerRepo.contains = function (writer) {
    var found = false;
    for (var i in writerRepo.list) {
      if (writerRepo.list[i].id === writer.id) {
        found = true;
        break;
      }
    }
    return found;
  };

  writerRepo.delete = function (writer) {
    defer = $q.defer();
    for (var i in writerRepo.list) {
      if (writerRepo.list[i].id === writer.id) {
        writerRepo.list.splice(i, 1);
        break;
      }
    }
    payloadResponse();
    return defer.promise;
  };

  writerRepo.getAll = function () {
    return angular.copy(writerRepo.list);
  };

  writerRepo.getScaffold = function(defaults) {
    var updatedScaffold = scaffold;
    if (!defaults) defaults = {};
    angular.extend(updatedScaffold, defaults);
    return updatedScaffold;
  };

  writerRepo.getValidations = function () {
    return angular.copy(validations);
  };

  writerRepo.getValidationResults = function () {
    return angular.copy(validationResults);
  };

  writerRepo.isInScaffold = function(property) {
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

  writerRepo.ready = function () {
    defer = $q.defer();
    payloadResponse();
    return defer.promise;
  };

  writerRepo.update = function (writer) {
    defer = $q.defer();
    var updatedWriter;
    for (var i in writerRepo.list) {
      if (writerRepo.list[i].id === writer.id) {
        updatedWriter = angular.copy(writerRepo.list[i]);
        angular.extend(updatedWriter, writer);
        break;
      }
    }
    payloadResponse(updatedWriter);
    return defer.promise;
  };

  return writerRepo;
});
