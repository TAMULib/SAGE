sage.controller('SolrWriterManagementController', function ($controller, $scope, NgTableParams, SolrWriterRepo, SolrReaderRepo, SolrCoreRepo) {
  
  angular.extend(this, $controller('AbstractController', {
      $scope: $scope
  }));

  $scope.solrWriters = SolrWriterRepo.getAll();
  $scope.solrCores = SolrCoreRepo.getAll();
  $scope.metadataFields = [];

  $scope.solrWriterToCreate = SolrReaderRepo.getScaffold();
  $scope.newSolrWriterMappings = {};
  $scope.solrWriterToUpdate = {};
  $scope.solrWriterToDelete = {};


  $scope.solrWriterForms = {
    validations: SolrWriterRepo.getValidations(),
    getResults: SolrWriterRepo.getValidationResults
  };

    SolrReaderRepo.getMetadataFields($scope.metadataFields);

  $scope.resetSolrWriterForms = function() {
    SolrWriterRepo.clearValidationResults();
    for (var key in $scope.solrWriterForms) {
      if ($scope.solrWriterForms[key] !== undefined && !$scope.solrWriterForms[key].$pristine && $scope.solrWriterForms[key].$setPristine) {
        $scope.solrWriterForms[key].$setPristine();
      }
    }
    $scope.closeModal();
  };

  $scope.startCreateSolrWriter = function() {
    $scope.openModal("#createSolrWriterModal");
  };

  $scope.createSolrWriter = function() {
    var mappings = [];

    angular.forEach($scope.newSolrWriterMappings, function(v,k) {
      mappings.push({"inputField": k, "mappings": v.split(";")});
    }, mappings);

    $scope.solrWriterToCreate.outputMappings = mappings;

    SolrWriterRepo.create($scope.solrWriterToCreate).then(function(res) {
      if(angular.fromJson(res.body).meta.status === "SUCCESS") {
        $scope.cancelCreateSolrWriter();
      }
    });
  };

  $scope.cancelCreateSolrWriter = function() {
    angular.extend($scope.solrWriterToCreate, SolrWriterRepo.getScaffold());
    $scope.newSolrWriterFields = {};
    $scope.resetSolrWriterForms();
  };

  $scope.updateSolrWriter = function() {
    $scope.updatingSolrWriter = true;
    $scope.solrWriterToUpdate.dirty(true);
    $scope.solrWriterToUpdate.save().then(function() {
      $scope.resetSolrWriterForms();
      $scope.updatingSolrWriter = false;
    });
  };

  $scope.startUpdateSolrWriter = function(reader) {
    $scope.solrWriterToUpdate = reader;
    $scope.openModal("#updateSolrWriterModal");
  };

  $scope.cancelUpdateSolrWriter = function(reader) {
    $scope.solrWriterToUpdate = {};
    $scope.resetSolrWriterForms();
  };

  $scope.confirmDeleteSolrWriter = function(reader) {
    $scope.solrWriterToDelete = reader;
    $scope.openModal("#confirmDeleteSolrWriterModal");
  };

  $scope.cancelDeleteSolrWriter = function(reader) {
    $scope.solrWriterToDelete = {};
    $scope.resetSolrWriterForms();
  };

  $scope.deleteSolrWriter = function() {
    $scope.deletingSolrWriter = true;
    SolrWriterRepo.delete($scope.solrWriterToDelete).then(function() {
      $scope.deletingSolrWriter = false;
      $scope.resetSolrWriterForms();
    });
  };

  SolrWriterRepo.ready().then(function() {
    $scope.setTable = function() {
      $scope.tableParams = new NgTableParams({
        count: $scope.solrWriters.length,
        sorting: {name: 'desc'}
      }, {
        counts: [],
        total: 0,
        getData: function(params) {
          return $scope.solrWriters;
        }
      });
    };
    $scope.setTable();
  });

});