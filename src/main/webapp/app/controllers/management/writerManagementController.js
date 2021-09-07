sage.controller('WriterManagementController', function ($controller, $scope, NgTableParams, WriterRepo, InternalMetadataRepo, SourceRepo) {

  angular.extend(this, $controller('AbstractController', {
    $scope: $scope
  }));

  $scope.writers = WriterRepo.getAll();
  $scope.sources = SourceRepo.getWriteable();

  $scope.writerToCreate = WriterRepo.getScaffold();
  $scope.writerToClone = {};
  $scope.writerMappings = {};
  $scope.writerToUpdate = {};
  $scope.writerToDelete = {};

  $scope.internalMetadata = InternalMetadataRepo.getAll();

  $scope.fields = [];

  $scope.writerForms = {
    validations: WriterRepo.getValidations(),
    getResults: WriterRepo.getValidationResults
  };

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

  $scope.updateFields = function(writer) {
    $scope.fields = SourceRepo.getIndexedFields(writer.source.uri, '*:*');
  };

  var applyMappings = function (writer) {
    var mappings = [];
    angular.forEach($scope.writerMappings, function(v,k) {
      mappings.push({"inputField": k, "mappings": v.split(";")});
    }, mappings);
    writer.outputMappings = mappings;
  };

  $scope.createWriter = function() {
    applyMappings($scope.writerToCreate);
    WriterRepo.create($scope.writerToCreate).then(function(res) {
      if (angular.fromJson(res.body).meta.status === "SUCCESS") {
        $scope.cancelCreateWriter();
      }
    });
  };

  $scope.cancelCreateWriter = function() {
    angular.extend($scope.writerToCreate, WriterRepo.getScaffold());
    $scope.writerMappings = {};
    $scope.resetWriterForms();
  };

  $scope.updateWriter = function() {
    $scope.updatingWriter = true;
    applyMappings($scope.writerToUpdate);
    $scope.writerToUpdate.dirty(true);
    $scope.writerToUpdate.save().then(function() {
      $scope.resetWriterForms();
      $scope.updatingWriter = false;
    });
  };

  $scope.startUpdateWriter = function(writer) {
    $scope.writerToUpdate = writer;
    angular.forEach($scope.writerToUpdate.outputMappings, function(mapping) {
      $scope.writerMappings[mapping.inputField] = mapping.mappings.join(";");
    });
    $scope.openModal("#updateWriterModal");
  };

  $scope.cancelUpdateWriter = function() {
    $scope.writerToUpdate = {};
    $scope.writerMappings = {};
    $scope.resetWriterForms();
  };

  $scope.confirmDeleteWriter = function(writer) {
    $scope.writerToDelete = writer;
    $scope.openModal("#confirmDeleteWriterModal");
  };

  $scope.cancelDeleteWriter = function() {
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

  $scope.cloneWriter = function() {
    $scope.cloningWriter = true;
    applyMappings($scope.writerToCreate);
    $scope.writerToClone.dirty(true);
    if($scope.writerToClone.id) {
      delete $scope.writerToClone.id; console.log($scope.writerToClone);
      WriterRepo.create($scope.writerToClone).then(function(res) {
      if (angular.fromJson(res.body).meta.status === "SUCCESS") {
        $scope.cancelCloneWriter();
      }
    });
    }
  };

  $scope.startCloneWriter = function(writer) {
    $scope.writerToClone = angular.copy(writer);
    angular.forEach($scope.writerToClone.outputMappings, function(mapping) {
      $scope.writerMappings[mapping.inputField] = mapping.mappings.join(";");
    });
    $scope.openModal("#cloneWriterModal");
  };

  $scope.cancelCloneWriter = function() {
    $scope.writerToClone = {};
    $scope.writerMappings = {};
    $scope.resetWriterForms();
  };

  $scope.disableSubmit = function(form) {
    var invalidFields = $scope.internalMetadata.filter(function(metadatum) {
      return metadatum.required;
    }).filter(function(metadatum) {
      return $scope.writerMappings[metadatum.field] === undefined;
    });
    return form.$invalid || invalidFields.length > 0;
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
