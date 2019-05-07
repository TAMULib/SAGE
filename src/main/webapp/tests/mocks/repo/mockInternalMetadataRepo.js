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
  var internalMetadataRepa = this;
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

  internalMetadataRepa.list = mockInternalMetadata;

  internalMetadataRepa.clearValidationResults = function () {
    validationResults = {};
  };

  internalMetadataRepa.create = function (internalMetadatum) {
      defer = $q.defer();
      internalMetadatum.id = internalMetadataRepa.list.length + 1;
      internalMetadataRepa.list.push(angular.copy(internalMetadatum));
      payloadResponse(internalMetadatum);
      return defer.promise;
  };

  internalMetadataRepa.contains = function (internalMetadatum) {
    var found = false;
    for (var i in internalMetadataRepa.list) {
      if (internalMetadataRepa.list[i].id === internalMetadatum.id) {
        found = true;
        break;
      }
    }
    return found;
  };

  internalMetadataRepa.delete = function (internalMetadatum) {
    defer = $q.defer();
    for (var i in internalMetadataRepa.list) {
      if (internalMetadataRepa.list[i].id === internalMetadatum.id) {
        internalMetadataRepa.list.splice(i, 1);
        break;
      }
    }
    payloadResponse();
    return defer.promise;
  };

  internalMetadataRepa.getAll = function () {
    return angular.copy(internalMetadataRepa.list);
  };

  internalMetadataRepa.getMetadataFields = function(fields) {
    defer = $q.defer();
    payloadResponse(angular.extend(fields, angular.copy(metadataFields)));
    return defer.promise;
  };

  internalMetadataRepa.getScaffold = function(defaults) {
    var updatedScaffold = scaffold;
    if (!defaults) defaults = {};
    angular.extend(updatedScaffold, defaults);
    return updatedScaffold;
  };

  internalMetadataRepa.getValidations = function () {
    return angular.copy(validations);
  };

  internalMetadataRepa.getValidationResults = function () {
    return angular.copy(validationResults);
  };

  internalMetadataRepa.isInScaffold = function(property) {
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

  internalMetadataRepa.ready = function () {
    defer = $q.defer();
    payloadResponse();
    return defer.promise;
  };

  internalMetadataRepa.update = function (internalMetadatum) {
    defer = $q.defer();
    var updatedInternalMetadatum;
    for (var i in internalMetadataRepa.list) {
      if (internalMetadataRepa.list[i].id === internalMetadatum.id) {
        updatedInternalMetadatum = angular.copy(internalMetadataRepa.list[i]);
        angular.extend(updatedInternalMetadatum, internalMetadatum);
        break;
      }
    }
    payloadResponse(updatedInternalMetadatum);
    return defer.promise;
  };

  return internalMetadataRepa;
});
