sage.controller('SolrCoreManagementController', function ($controller, $scope, NgTableParams, SolrCoreRepo) {
  
  angular.extend(this, $controller('AbstractController', {
      $scope: $scope
  }));

  $scope.solrCores = SolrCoreRepo.getAll();

  $scope.solrCoreToCreate = SolrCoreRepo.getScaffold();
  $scope.solrCoreToUpdate = {};
  $scope.solrCoreToDelete = {};

  $scope.solrCoreForms = {
    validations: SolrCoreRepo.getValidations(),
    getResults: SolrCoreRepo.getValidationResults
  };

  $scope.resetSolrCoreForms = function() {
    SolrCoreRepo.clearValidationResults();
    for (var key in $scope.solrCoreForms) {
      if ($scope.solrCoreForms[key] !== undefined && !$scope.solrCoreForms[key].$pristine && $scope.solrCoreForms[key].$setPristine) {
        $scope.solrCoreForms[key].$setPristine();
      }
    }
    $scope.closeModal();
  };

  $scope.startCreateSolrCore = function() {
    $scope.openModal("#createSolrCoreModal");
  };

  $scope.createSolrCore = function() {
    SolrCoreRepo.create($scope.solrCoreToCreate).then(function(res) {
      if(angular.fromJson(res.body).meta.status === "SUCCESS") {
        $scope.cancelCreateSolrCore();
      }
    });
  };

  $scope.cancelCreateSolrCore = function() {
    angular.extend($scope.solrCoreToCreate, SolrCoreRepo.getScaffold());
    $scope.resetSolrCoreForms();
  };

  $scope.updateSolrCore = function() {
    $scope.updatingSolrCore = true;
    $scope.solrCoreToUpdate.save().then(function() {
      $scope.resetSolrCoreForms();
      $scope.updatingSolrCore = false;
    });
  };

  $scope.startUpdateSolrCore = function(core) {
    $scope.solrCoreToUpdate = core;
    $scope.openModal("#updateSolrCoreModal");
  };

  $scope.cancelUpdateSolrCore = function(core) {
    $scope.solrCoreToUpdate = {};
    $scope.resetSolrCoreForms();
  };

  $scope.confirmDeleteSolrCore = function(core) {
    $scope.solrCoreToDelete = core;
    $scope.openModal("#confirmDeleteSolrCoreModal");
  };

  $scope.cancelDeleteSolrCore = function(core) {
    $scope.solrCoreToDelete = {};
    $scope.resetSolrCoreForms();
  };

  $scope.deleteSolrCore = function() {
    $scope.deletingSolrCore = true;
    SolrCoreRepo.delete($scope.solrCoreToDelete).then(function() {
      $scope.deletingSolrCore = false;
      $scope.resetSolrCoreForms();
    });
  };

  SolrCoreRepo.ready().then(function() {
    $scope.setTable = function() {
      $scope.tableParams = new NgTableParams({
        count: $scope.solrCores.length,
        sorting: {name: 'desc'}
      }, {
        counts: [],
        total: 0,
        getData: function(params) {
          return $scope.solrCores;
        }
      });
    };
    $scope.setTable();
  });

});