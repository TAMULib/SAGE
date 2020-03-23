sage.controller('OperatorManagementController', function ($controller, $scope, NgTableParams, InternalMetadataRepo, OperatorRepo, ValidationStore) {

  angular.extend(this, $controller('AbstractController', {
    $scope: $scope
  }));

  $scope.internalMetadata = InternalMetadataRepo.getAll();

  $scope.operators = OperatorRepo.getAll();

  $scope.operatorTypes = OperatorRepo.getTypes();

  $scope.operatorToCreate = OperatorRepo.getScaffold();
  $scope.operatorToUpdate = {};
  $scope.operatorToDelete = {};

  $scope.operatorForms = {
    validations: OperatorRepo.getValidations(),
    getResults: OperatorRepo.getValidationResults
  };

  $scope.resetOperatorForms = function() {
    OperatorRepo.clearValidationResults();
    for (var key in $scope.operatorForms) {
      if ($scope.operatorForms[key] !== undefined && !$scope.operatorForms[key].$pristine && $scope.operatorForms[key].$setPristine) {
        $scope.operatorForms[key].$setPristine();
      }
    }
    $scope.closeModal();
  };

  $scope.enableFieldInput = function(opType) {
    return ['DEFAULT_OP', 'CONSTANT_OP', 'APPLICATION_TYPE_OP', 'DATE_NORMALIZATION_OP', 'REGEX_REPLACE_OP', 'TEMPLATE_OP'].indexOf(opType) >= 0;
  };

  $scope.enableValueInput = function(opType) {
    return ['DEFAULT_OP', 'CONSTANT_OP', 'DATE_NORMALIZATION_OP', 'REGEX_REPLACE_OP'].indexOf(opType) >= 0;
  };

  $scope.enableMultiSuggestionValueInput = function(opType) {
    return ['TEMPLATE_OP'].indexOf(opType) >= 0;
  };

  $scope.enableRegexInput = function(opType) {
    return ['REGEX_REPLACE_OP'].indexOf(opType) >= 0;
  };

  $scope.enableRegexInput = function(opType) {
    return opType === 'REGEX_REPLACE_OP';
  };

  $scope.typeChanged = function(operator) {
    if (!$scope.enableFieldInput(operator.type)) {
      operator.field = "";
    }
    if (!$scope.enableValueInput(operator.type)) {
      operator.value = "";
    }
    if (!$scope.enableRegexInput(operator.type)) {
      operator.regex = "";
    }
    for (var i = 0; i < $scope.operatorTypes.length; i++) {
      if ($scope.operatorTypes.hasOwnProperty(i)) {
        if ($scope.operatorTypes[i].name === operator.type) {
          angular.extend($scope.operatorForms, {
            validations: ValidationStore.getValidations($scope.operatorTypes[i].entity)
          });
          break;
        }
      }
    }
  };

  $scope.startCreateOperator = function() {
    $scope.typeChanged($scope.operatorToCreate);
    $scope.openModal("#createOperatorModal");
  };

  $scope.createOperator = function() {
    $scope.creatingOperator = true;
    OperatorRepo.create($scope.operatorToCreate).then(function(res) {
      if (angular.fromJson(res.body).meta.status === "SUCCESS") {
        $scope.cancelCreateOperator();
      }
      $scope.creatingOperator = false;
    });
  };

  $scope.cancelCreateOperator = function() {
    angular.extend($scope.operatorToCreate, OperatorRepo.getScaffold());
    $scope.newOperatorFields = {};
    $scope.resetOperatorForms();
  };

  $scope.updateOperator = function() {
    $scope.updatingOperator = true;
    $scope.operatorToUpdate.dirty(true);
    $scope.operatorToUpdate.save().then(function(res) {
      if (angular.fromJson(res.body).meta.status === "SUCCESS") {
        $scope.resetOperatorForms();
      }
      $scope.updatingOperator = false;
    });
  };

  $scope.startUpdateOperator = function(operator) {
    $scope.operatorToUpdate = operator;
    $scope.typeChanged($scope.operatorToUpdate);
    $scope.openModal("#updateOperatorModal");
  };

  $scope.cancelUpdateOperator = function() {
    $scope.operatorToUpdate.refresh();
    $scope.operatorToUpdate = {};
    $scope.resetOperatorForms();
  };

  $scope.confirmDeleteOperator = function(operator) {
    $scope.operatorToDelete = operator;
    $scope.openModal("#confirmDeleteOperatorModal");
  };

  $scope.cancelDeleteOperator = function() {
    $scope.operatorToDelete = {};
    $scope.resetOperatorForms();
  };

  $scope.deleteOperator = function() {
    $scope.deletingOperator = true;
    OperatorRepo.delete($scope.operatorToDelete).then(function(res) {
      if (angular.fromJson(res.body).meta.status === "SUCCESS") {
        $scope.resetOperatorForms();
      }
      $scope.deletingOperator = false;
    });
  };

  OperatorRepo.ready().then(function() {
    $scope.setTable = function() {
      $scope.tableParams = new NgTableParams({
        count: $scope.operators.length,
        sorting: {name: 'desc'}
      }, {
        counts: [],
        total: 0,
        getData: function(params) {
          return $scope.operators;
        }
      });
    };
    $scope.setTable();
  });

});
