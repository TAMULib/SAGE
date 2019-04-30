sage.controller('WriterManagementController', function ($controller, $scope, NgTableParams, WriterRepo, ReaderRepo, SourceRepo) {

  angular.extend(this, $controller('AbstractController', {
      $scope: $scope
  }));

  $scope.writers = WriterRepo.getAll();
  $scope.sources = SourceRepo.getAll();
  $scope.metadataFields = [];

  $scope.writerToCreate = WriterRepo.getScaffold();
  $scope.newWriterMappings = {};
  $scope.writerToUpdate = {};
  $scope.writerToDelete = {};

  $scope.fields = [];

  $scope.writerForms = {
    validations: WriterRepo.getValidations(),
    getResults: WriterRepo.getValidationResults
  };

    ReaderRepo.getMetadataFields($scope.metadataFields);

  $scope.resetWriterForms = function() {
    WriterRepo.clearValidationResults();
    for (var key in $scope.writerForms) {
      if ($scope.writerForms[key] !== undefined && !$scope.writerForms[key].$pristine && $scope.writerForms[key].$setPristine) {
        $scope.writerForms[key].$setPristine();
      }
    }
    $scope.closeModal();
  };

  $scope.startCreateWriter = function() {
    $scope.openModal("#createWriterModal");
  };

  $scope.sourceChanged = function() {
    $scope.getFields($scope.writerToCreate.source.uri, "*:*");
  };

  $scope.getFields = function(uri, filter) {
    $scope.fields = SourceRepo.getFields(uri, filter);
  };

  $scope.createWriter = function() {
    var mappings = [];

    angular.forEach($scope.newWriterMappings, function(v,k) {
      mappings.push({"inputField": k, "mappings": v.split(";")});
    }, mappings);

    $scope.writerToCreate.outputMappings = mappings;

    WriterRepo.create($scope.writerToCreate).then(function(res) {
      if(angular.fromJson(res.body).meta.status === "SUCCESS") {
        $scope.cancelCreateWriter();
      }
    });
  };

  $scope.cancelCreateWriter = function() {
    angular.extend($scope.writerToCreate, WriterRepo.getScaffold());
    $scope.newWriterFields = {};
    $scope.resetWriterForms();
  };

  $scope.updateWriter = function() {
    $scope.updatingWriter = true;
    $scope.writerToUpdate.dirty(true);
    $scope.writerToUpdate.save().then(function() {
      $scope.resetWriterForms();
      $scope.updatingWriter = false;
    });
  };

  $scope.startUpdateWriter = function(reader) {
    $scope.writerToUpdate = reader;
    $scope.openModal("#updateWriterModal");
  };

  $scope.cancelUpdateWriter = function(reader) {
    $scope.writerToUpdate = {};
    $scope.resetWriterForms();
  };

  $scope.confirmDeleteWriter = function(reader) {
    $scope.writerToDelete = reader;
    $scope.openModal("#confirmDeleteWriterModal");
  };

  $scope.cancelDeleteWriter = function(reader) {
    $scope.writerToDelete = {};
    $scope.resetWriterForms();
  };

  $scope.deleteWriter = function() {
    $scope.deletingWriter = true;
    WriterRepo.delete($scope.writerToDelete).then(function() {
      $scope.deletingWriter = false;
      $scope.resetWriterForms();
    });
  };

  WriterRepo.ready().then(function() {
    $scope.setTable = function() {
      $scope.tableParams = new NgTableParams({
        count: $scope.writers.length,
        sorting: {name: 'desc'}
      }, {
        counts: [],
        total: 0,
        getData: function(params) {
          return $scope.writers;
        }
      });
    };
    $scope.setTable();
  });

});
