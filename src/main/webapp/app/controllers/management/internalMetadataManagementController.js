sage.controller('InternalMetadataManagementController', function ($controller, $scope, NgTableParams, InternalMetadataRepo) {

  angular.extend(this, $controller('AbstractController', {
      $scope: $scope
  }));

  $scope.internalMetadata = InternalMetadataRepo.getAll();

  $scope.internalMetadatumToCreate = InternalMetadataRepo.getScaffold();
  $scope.internalMetadatumToUpdate = {};
  $scope.internalMetadatumToDelete = {};

  $scope.internalMetadatumForms = {
    validations: InternalMetadataRepo.getValidations(),
    getResults: InternalMetadataRepo.getValidationResults
  };

  $scope.resetInternalMetadatumForms = function() {
    InternalMetadataRepo.clearValidationResults();
    for (var key in $scope.internalMetadatumForms) {
      if ($scope.internalMetadatumForms[key] !== undefined && !$scope.internalMetadatumForms[key].$pristine && $scope.internalMetadatumForms[key].$setPristine) {
        $scope.internalMetadatumForms[key].$setPristine();
      }
    }
    $scope.closeModal();
  };

  $scope.startCreateInternalMetadatum = function() {
    $scope.openModal("#createInternalMetadatumModal");
  };

  $scope.createInternalMetadatum = function() {
    InternalMetadataRepo.create($scope.internalMetadatumToCreate).then(function(res) {
      if(angular.fromJson(res.body).meta.status === "SUCCESS") {
        $scope.cancelCreateInternalMetadatum();
      }
    });
  };

  $scope.cancelCreateInternalMetadatum = function() {
    angular.extend($scope.internalMetadatumToCreate, InternalMetadataRepo.getScaffold());
    $scope.newInternalMetadatumFields = {};
    $scope.resetInternalMetadatumForms();
  };

  $scope.updateInternalMetadatum = function() {
    $scope.updatingInternalMetadatum = true;
    $scope.internalMetadatumToUpdate.dirty(true);
    $scope.internalMetadatumToUpdate.save().then(function() {
      $scope.resetInternalMetadatumForms();
      $scope.updatingInternalMetadatum = false;
    });
  };

  $scope.startUpdateInternalMetadatum = function(internalMetadatum) {
    $scope.internalMetadatumToUpdate = internalMetadatum;
    $scope.openModal("#updateInternalMetadatumModal");
  };

  $scope.cancelUpdateInternalMetadatum = function(internalMetadatum) {
    $scope.internalMetadatumToUpdate.refresh();
    $scope.internalMetadatumToUpdate = {};
    $scope.resetInternalMetadatumForms();
  };

  $scope.confirmDeleteInternalMetadatum = function(internalMetadatum) {
    $scope.internalMetadatumToDelete = internalMetadatum;
    $scope.openModal("#confirmDeleteInternalMetadatumModal");
  };

  $scope.cancelDeleteInternalMetadatum = function(internalMetadatum) {
    $scope.internalMetadatumToDelete = {};
    $scope.resetInternalMetadatumForms();
  };

  $scope.deleteInternalMetadatum = function() {
    $scope.deletingInternalMetadatum = true;
    InternalMetadataRepo.delete($scope.internalMetadatumToDelete).then(function() {
      $scope.deletingInternalMetadatum = false;
      $scope.resetInternalMetadatumForms();
    });
  };

  InternalMetadataRepo.ready().then(function() {
    $scope.setTable = function() {
      $scope.tableParams = new NgTableParams({
        count: $scope.internalMetadata.length,
        sorting: {name: 'desc'}
      }, {
        counts: [],
        total: 0,
        getData: function(params) {
          return $scope.internalMetadata;
        }
      });
    };
    $scope.setTable();
  });

});
