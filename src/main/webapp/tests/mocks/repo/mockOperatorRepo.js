var mockOperator = [
  {
    "id": 1,
    "type": "DEFAULT_OP",
    "name": "Default Thumbnail",
    "field": "thumbnail",
    "value": "https://brandguide.tamu.edu/assets/downloads/logos/TAM-Logo.png"
  },
  {
    "id": 2,
    "type": "CONSTANT_OP",
    "name": "Organization",
    "field": "organization",
    "value": "TAMU"
  },
  {
    "id": 3,
    "type": "DFAULT_OP",
    "name": "Default Language",
    "field": "language",
    "value": "English"
  }
];

angular.module('mock.operatorRepo', []).service('OperatorRepo', function ($q) {
  var operatorRepo = this;
  var defer;
  var validations = {};
  var validationResults = {};
  var scaffold = mockOperator[0];
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

  operatorRepo.list = mockOperator;

  operatorRepo.clearValidationResults = function () {
    validationResults = {};
  };

  operatorRepo.getTypes = function () {
    return [
      {
        name: 'DEFAULT_OP',
        entity: 'DefaultOp'
      },
      {
        name: 'CONSTANT_OP',
        entity: 'ConstantOp'
      }
    ]
  };

  operatorRepo.create = function (internalMetadatum) {
      defer = $q.defer();
      internalMetadatum.id = operatorRepo.list.length + 1;
      operatorRepo.list.push(angular.copy(internalMetadatum));
      payloadResponse(internalMetadatum);
      return defer.promise;
  };

  operatorRepo.contains = function (internalMetadatum) {
    var found = false;
    for (var i in operatorRepo.list) {
      if (operatorRepo.list[i].id === internalMetadatum.id) {
        found = true;
        break;
      }
    }
    return found;
  };

  operatorRepo.delete = function (internalMetadatum) {
    defer = $q.defer();
    for (var i in operatorRepo.list) {
      if (operatorRepo.list[i].id === internalMetadatum.id) {
        operatorRepo.list.splice(i, 1);
        break;
      }
    }
    payloadResponse();
    return defer.promise;
  };

  operatorRepo.getAll = function () {
    return angular.copy(operatorRepo.list);
  };

  operatorRepo.getMetadataFields = function(fields) {
    defer = $q.defer();
    payloadResponse(angular.extend(fields, angular.copy(metadataFields)));
    return defer.promise;
  };

  operatorRepo.getScaffold = function(defaults) {
    var updatedScaffold = scaffold;
    if (!defaults) defaults = {};
    angular.extend(updatedScaffold, defaults);
    return updatedScaffold;
  };

  operatorRepo.getValidations = function () {
    return angular.copy(validations);
  };

  operatorRepo.getValidationResults = function () {
    return angular.copy(validationResults);
  };

  operatorRepo.isInScaffold = function(property) {
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

  operatorRepo.ready = function () {
    defer = $q.defer();
    payloadResponse();
    return defer.promise;
  };

  operatorRepo.update = function (internalMetadatum) {
    defer = $q.defer();
    var updatedInternalMetadatum;
    for (var i in operatorRepo.list) {
      if (operatorRepo.list[i].id === internalMetadatum.id) {
        updatedInternalMetadatum = angular.copy(operatorRepo.list[i]);
        angular.extend(updatedInternalMetadatum, internalMetadatum);
        break;
      }
    }
    payloadResponse(updatedInternalMetadatum);
    return defer.promise;
  };

  return operatorRepo;
});
