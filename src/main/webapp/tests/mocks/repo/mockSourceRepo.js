var mockSources = [
  {
    "id": 1,
    "name": "Source 1",
    "uri": "cap.library.tamu.edu",
    "username": null,
    "password": null
  },
  {
    "id": 2,
    "name": "Source 2",
    "uri": "cap.library.tamu.edu",
    "username": null,
    "password": null
  },
  {
    "id": 3,
    "name": "Source 3",
    "uri": "cap.library.tamu.edu",
    "username": "4253938752821",
    "password": "1425393875282"
  }
];

angular.module('mock.sourceRepo', []).service('SourceRepo', function ($q) {
  var sourceRepo = this;
  var defer;
  var validations = {};
  var validationResults = {};
  var scaffold = mockSources[0];

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

  sourceRepo.list = mockSources;

  sourceRepo.clearValidationResults = function () {
    validationResults = {};
  };

  sourceRepo.create = function (source) {
      defer = $q.defer();
      source.id = sourceRepo.list.length + 1;
      sourceRepo.list.push(angular.copy(source));
      payloadResponse(source);
      return defer.promise;
  };

  sourceRepo.contains = function (source) {
    var found = false;
    for (var i in sourceRepo.list) {
      if (sourceRepo.list[i].id === source.id) {
        found = true;
        break;
      }
    }
    return found;
  };

  sourceRepo.delete = function (source) {
    defer = $q.defer();
    for (var i in sourceRepo.list) {
      if (sourceRepo.list[i].id === source.id) {
        sourceRepo.list.splice(i, 1);
        break;
      }
    }
    payloadResponse();
    return defer.promise;
  };

  sourceRepo.getAll = function () {
    return angular.copy(sourceRepo.list);
  };

  sourceRepo.getScaffold = function(defaults) {
    var updatedScaffold = scaffold;
    if (!defaults) defaults = {};
    angular.extend(updatedScaffold, defaults);
    return updatedScaffold;
  };

  sourceRepo.getValidations = function () {
    return angular.copy(validations);
  };

  sourceRepo.getValidationResults = function () {
    return angular.copy(validationResults);
  };

  sourceRepo.isInScaffold = function(property) {
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

  sourceRepo.ready = function () {
    defer = $q.defer();
    payloadResponse();
    return defer.promise;
  };

  sourceRepo.update = function (source) {
    defer = $q.defer();
    var updatedSource;
    for (var i in sourceRepo.list) {
      if (sourceRepo.list[i].id === source.id) {
        updatedSource = angular.copy(sourceRepo.list[i]);
        angular.extend(updatedSource, source);
        break;
      }
    }
    payloadResponse(updatedSource);
    return defer.promise;
  };

  return sourceRepo;
});
