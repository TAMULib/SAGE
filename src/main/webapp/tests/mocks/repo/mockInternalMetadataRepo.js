var mockInternalMetadata = [
  {
    "id": 1,
    "gloss": "Id",
    "field": "id",
    "required": true
  },
  {
    "id": 2,
    "gloss": "Title",
    "field": "title",
    "required": true
  },
  {
    "id": 3,
    "gloss": "Description",
    "field": "description",
    "required": false
  },
  {
    "id": 4,
    "gloss": "Language",
    "field": "language",
    "required": false
  }
];

angular.module('mock.internalMetadataRepo', []).service('InternalMetadataRepo', function ($q) {
  var internalMetadataRepo = this;
  var defer;
  var validations = {};
  var validationResults = {};
  var scaffold = mockInternalMetadata[0];
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

  internalMetadataRepo.list = mockInternalMetadata;

  internalMetadataRepo.clearValidationResults = function () {
    validationResults = {};
  };

  internalMetadataRepo.create = function (internalMetadatum) {
      defer = $q.defer();
      internalMetadatum.id = internalMetadataRepo.list.length + 1;
      internalMetadataRepo.list.push(angular.copy(internalMetadatum));
      payloadResponse(internalMetadatum);
      return defer.promise;
  };

  internalMetadataRepo.contains = function (internalMetadatum) {
    var found = false;
    for (var i in internalMetadataRepo.list) {
      if (internalMetadataRepo.list[i].id === internalMetadatum.id) {
        found = true;
        break;
      }
    }
    return found;
  };

  internalMetadataRepo.delete = function (internalMetadatum) {
    defer = $q.defer();
    for (var i in internalMetadataRepo.list) {
      if (internalMetadataRepo.list[i].id === internalMetadatum.id) {
        internalMetadataRepo.list.splice(i, 1);
        break;
      }
    }
    payloadResponse();
    return defer.promise;
  };

  internalMetadataRepo.getAll = function () {
    return angular.copy(internalMetadataRepo.list);
  };

  internalMetadataRepo.getMetadataFields = function(fields) {
    defer = $q.defer();
    payloadResponse(angular.extend(fields, angular.copy(metadataFields)));
    return defer.promise;
  };

  internalMetadataRepo.getScaffold = function(defaults) {
    var updatedScaffold = scaffold;
    if (!defaults) defaults = {};
    angular.extend(updatedScaffold, defaults);
    return updatedScaffold;
  };

  internalMetadataRepo.getValidations = function () {
    return angular.copy(validations);
  };

  internalMetadataRepo.getValidationResults = function () {
    return angular.copy(validationResults);
  };

  internalMetadataRepo.isInScaffold = function(property) {
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

  internalMetadataRepo.ready = function () {
    defer = $q.defer();
    payloadResponse();
    return defer.promise;
  };

  internalMetadataRepo.update = function (internalMetadatum) {
    defer = $q.defer();
    var updatedInternalMetadatum;
    for (var i in internalMetadataRepo.list) {
      if (internalMetadataRepo.list[i].id === internalMetadatum.id) {
        updatedInternalMetadatum = angular.copy(internalMetadataRepo.list[i]);
        angular.extend(updatedInternalMetadatum, internalMetadatum);
        break;
      }
    }
    payloadResponse(updatedInternalMetadatum);
    return defer.promise;
  };

  return internalMetadataRepo;
});
