// This managers "Cores", to represent a "Source", the readOnly property of a "Core" needs to be set to TRUE.
sage.controller('SourceManagementController', function ($controller, $scope, NgTableParams, SourceRepo) {

  angular.extend(this, $controller('AbstractController', {
      $scope: $scope
  }));

  $scope.sources = SourceRepo.getAll();

  $scope.applicationTypes = SourceRepo.getApplicationTypes();

  $scope.sourceToCreate = SourceRepo.getScaffold();
  $scope.sourceToUpdate = {};
  $scope.sourceToDelete = {};

  $scope.sourceForms = {
    validations: SourceRepo.getValidations(),
    getResults: SourceRepo.getValidationResults
  };

  $scope.resetSourceForms = function() {
    SourceRepo.clearValidationResults();
    for (var key in $scope.sourceForms) {
      if ($scope.sourceForms[key] !== undefined && !$scope.sourceForms[key].$pristine && $scope.sourceForms[key].$setPristine) {
        $scope.sourceForms[key].$setPristine();
      }
    }
    $scope.closeModal();
  };

  $scope.startCreateSource = function() {
    $scope.sourceToCreate.applicationType = $scope.applicationTypes[0];
    $scope.openModal("#createSourceModal");
  };

  $scope.createSource = function() {
    SourceRepo.create($scope.sourceToCreate).then(function(res) {
      if (angular.fromJson(res.body).meta.status === "SUCCESS") {
        $scope.cancelCreateSource();
      }
    });
  };

  $scope.cancelCreateSource = function() {
    angular.extend($scope.sourceToCreate, SourceRepo.getScaffold());
    $scope.resetSourceForms();
  };

  $scope.updateSource = function() {
    $scope.updatingSource = true;
    $scope.sourceToUpdate.save().then(function() {
      $scope.resetSourceForms();
      $scope.updatingSource = false;
    });
  };

  $scope.startUpdateSource = function(core) {
    $scope.sourceToUpdate = core;
    $scope.openModal("#updateSourceModal");
  };

  $scope.cancelUpdateSource = function(core) {
    $scope.sourceToUpdate = {};
    $scope.resetSourceForms();
  };

  $scope.confirmDeleteSource = function(core) {
    $scope.sourceToDelete = core;
    $scope.openModal("#confirmDeleteSourceModal");
  };

  $scope.cancelDeleteSource = function(core) {
    $scope.sourceToDelete = {};
    $scope.resetSourceForms();
  };

  $scope.deleteSource = function() {
    $scope.deletingSource = true;
    SourceRepo.delete($scope.sourceToDelete).then(function() {
      $scope.deletingSource = false;
      $scope.resetSourceForms();
    });
  };

  SourceRepo.ready().then(function() {
    $scope.setTable = function() {
      $scope.tableParams = new NgTableParams({
        count: $scope.sources.length,
        sorting: {name: 'desc'}
      }, {
        counts: [],
        total: 0,
        getData: function(params) {
          return $scope.sources;
        }
      });
    };
    $scope.setTable();
  });

});
