var mockFields = [
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

var mockReaders = [
  {
    "id": 1,
    "name": "Reader 1",
    "source": {
      "id": 1,
      "name": "Source 1",
      "uri": "http://localhost:8983/solr/collection1",
      "username": null
    },
    "fields": mockFields,
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
    "fields": mockFields,
    "sortTitle": "title",
    "sortId": "id"

  },
  {
    "id": 3,
    "name": "Reader 3",
    "source": {
      "id": 3,
      "name": "Source 3",
      "uri": "http://localhost:8983/solr/collection3",
      "username": "4253938752821"
    },
    "fields": mockFields,
    "sortTitle": "title",
    "sortId": "id"

  }
];

angular.module('mock.readerRepo', []).service('ReaderRepo', function ($q) {
  var readerRepo = this;
  var defer;
  var validations = {};
  var validationResults = {};
  var scaffold = mockReaders[0];
  var metadataFields = mockFields;

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

  readerRepo.list = mockReaders;

  readerRepo.clearValidationResults = function () {
    validationResults = {};
  };

  readerRepo.create = function (reader) {
      defer = $q.defer();
      reader.id = readerRepo.list.length + 1;
      readerRepo.list.push(angular.copy(reader));
      payloadResponse(reader);
      return defer.promise;
  };

  readerRepo.contains = function (reader) {
    var found = false;
    for (var i in readerRepo.list) {
      if (readerRepo.list[i].id === reader.id) {
        found = true;
        break;
      }
    }
    return found;
  };

  readerRepo.delete = function (reader) {
    defer = $q.defer();
    for (var i in readerRepo.list) {
      if (readerRepo.list[i].id === reader.id) {
        readerRepo.list.splice(i, 1);
        break;
      }
    }
    payloadResponse();
    return defer.promise;
  };

  readerRepo.getAll = function () {
    return angular.copy(readerRepo.list);
  };

  readerRepo.getMetadataFields = function(fields) {
    defer = $q.defer();
    payloadResponse(angular.extend(fields, angular.copy(metadataFields)));
    return defer.promise;
  };

  readerRepo.getScaffold = function(defaults) {
    var updatedScaffold = scaffold;
    if (!defaults) defaults = {};
    angular.extend(updatedScaffold, defaults);
    return updatedScaffold;
  };

  readerRepo.getValidations = function () {
    return angular.copy(validations);
  };

  readerRepo.getValidationResults = function () {
    return angular.copy(validationResults);
  };

  readerRepo.isInScaffold = function(property) {
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

  readerRepo.ready = function () {
    defer = $q.defer();
    payloadResponse();
    return defer.promise;
  };

  readerRepo.update = function (reader) {
    defer = $q.defer();
    var updatedReader;
    for (var i in readerRepo.list) {
      if (readerRepo.list[i].id === reader.id) {
        updatedReader = angular.copy(readerRepo.list[i]);
        angular.extend(updatedReader, reader);
        break;
      }
    }
    payloadResponse(updatedReader);
    return defer.promise;
  };

  return readerRepo;
});
