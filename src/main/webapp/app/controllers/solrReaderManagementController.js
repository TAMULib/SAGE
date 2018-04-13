sage.controller('SolrReaderManagementController', function ($controller, $scope, NgTableParams, SolrReaderRepo, SolrCoreRepo) {
  
  angular.extend(this, $controller('AbstractController', {
      $scope: $scope
  }));

  $scope.solrReaders = SolrReaderRepo.getAll();
  $scope.solrCores = SolrCoreRepo.getAll();

  $scope.solrReaderToCreate = SolrReaderRepo.getScaffold();
  $scope.solrReaderToUpdate = {};
  $scope.solrReaderToDelete = {};

  $scope.solrReaderForms = {
    validations: SolrReaderRepo.getValidations(),
    getResults: SolrReaderRepo.getValidationResults
  };

  $scope.resetSolrReaderForms = function() {
    SolrReaderRepo.clearValidationResults();
    for (var key in $scope.solrReaderForms) {
      if ($scope.solrReaderForms[key] !== undefined && !$scope.solrReaderForms[key].$pristine && $scope.solrReaderForms[key].$setPristine) {
        $scope.solrReaderForms[key].$setPristine();
      }
    }
    $scope.closeModal();
  };

  $scope.startCreateSolrReader = function() {
    $scope.openModal("#createSolrReaderModal");
  };

  $scope.createSolrReader = function() {
    SolrReaderRepo.create($scope.solrReaderToCreate).then(function(res) {
      if(angular.fromJson(res.body).meta.status === "SUCCESS") {
        $scope.cancelCreateSolrReader();
      }
    });
  };

  $scope.cancelCreateSolrReader = function() {
    angular.extend($scope.solrReaderToCreate, SolrReaderRepo.getScaffold());
    $scope.resetSolrReaderForms();
  };

  $scope.updateSolrReader = function() {
    $scope.updatingSolrReader = true;
    $scope.solrReaderToUpdate.save().then(function() {
      $scope.resetSolrReaderForms();
      $scope.updatingSolrReader = false;
    });
  };

  $scope.startUpdateSolrReader = function(reader) {
    $scope.solrReaderToUpdate = reader;
    $scope.openModal("#updateSolrReaderModal");
  };

  $scope.cancelUpdateSolrReader = function(reader) {
    $scope.solrReaderToUpdate = {};
    $scope.resetSolrReaderForms();
  };

  $scope.confirmDeleteSolrReader = function(reader) {
    $scope.solrReaderToDelete = reader;
    $scope.openModal("#confirmDeleteSolrReaderModal");
  };

  $scope.cancelDeleteSolrReader = function(reader) {
    $scope.solrReaderToDelete = {};
    $scope.resetSolrReaderForms();
  };

  $scope.deleteSolrReader = function() {
    $scope.deletingSolrReader = true;
    SolrReaderRepo.delete($scope.solrReaderToDelete).then(function() {
      $scope.deletingSolrReader = false;
      $scope.resetSolrReaderForms();
    });
  };

  SolrReaderRepo.ready().then(function() {
    $scope.setTable = function() {
      $scope.tableParams = new NgTableParams({
        count: $scope.solrReaders.length,
        sorting: {name: 'desc'}
      }, {
        counts: [],
        total: 0,
        getData: function(params) {
          return $scope.solrReaders;
        }
      });
    };
    $scope.setTable();
  });

});