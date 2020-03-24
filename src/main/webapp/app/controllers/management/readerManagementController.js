sage.controller('ReaderManagementController', function ($controller, $scope, $timeout, NgTableParams, InternalMetadataRepo, ReaderRepo, SourceRepo) {

  angular.extend(this, $controller('AbstractController', {
      $scope: $scope
  }));

  $scope.readers = ReaderRepo.getAll();
  $scope.sources = SourceRepo.getReadable();

  $scope.readerToCreate = ReaderRepo.getScaffold();
  $scope.readerFields = {};
  $scope.readerToUpdate = {};
  $scope.readerToDelete = {};

  $scope.internalMetadata = InternalMetadataRepo.getAll();

  $scope.fields = [];

  $scope.readerForms = {
    validations: ReaderRepo.getValidations(),
    getResults: ReaderRepo.getValidationResults
  };

  $scope.resetReaderForms = function() {
    ReaderRepo.clearValidationResults();
    for (var key in $scope.readerForms) {
      if ($scope.readerForms[key] !== undefined && !$scope.readerForms[key].$pristine && $scope.readerForms[key].$setPristine) {
        $scope.readerForms[key].$setPristine();
      }
    }
    $scope.closeModal();
  };

  $scope.startCreateReader = function() {
    $scope.openModal("#createReaderModal");
  };

  $scope.updateFields = function(reader) {
    if (reader.source !== undefined && reader.filter.length > 0) {
      $scope.fields = SourceRepo.getIndexedFields(reader.source.uri, reader.filter);
    }
  };

  var filterChangeDebouncePromise;

  var filterChangeWrapper = function(reader) {
    return function(newFilter, oldFilter) {
      if (newFilter !== oldFilter) {
        if (filterChangeDebouncePromise !== undefined) {
          $timeout.cancel(filterChangeDebouncePromise);
        }
        filterChangeDebouncePromise = $timeout(function() {
          $scope.updateFields(reader);
        }, 5000);
      }
    };
  }

  $scope.$watch("readerToCreate.filter", filterChangeWrapper($scope.readerToCreate));

  var applyFields = function (reader) {
    var fields = [];
    angular.forEach($scope.readerFields, function(valueObj,key) {
      this.push({"name":valueObj.value,"schemaMapping": key});
    }, fields);
    reader.fields = fields;
  };

  $scope.createReader = function() {
    applyFields($scope.readerToCreate);

    ReaderRepo.create($scope.readerToCreate).then(function(res) {
      if (angular.fromJson(res.body).meta.status === "SUCCESS") {
        $scope.cancelCreateReader();
      }
    });
  };

  $scope.cancelCreateReader = function() {
    angular.extend($scope.readerToCreate, ReaderRepo.getScaffold());
    $scope.readerFields = {};
    $scope.resetReaderForms();
  };

  $scope.updateReader = function() {
    $scope.updatingReader = true;
    applyFields($scope.readerToUpdate);
    $scope.readerToUpdate.dirty(true);
    $scope.readerToUpdate.save().then(function() {
      $scope.resetReaderForms();
      $scope.updatingReader = false;
    });
  };

  var readerToUpdateWatcher;

  $scope.startUpdateReader = function(reader) {
    $scope.readerToUpdate = reader;
    if (readerToUpdateWatcher !== undefined) {
      readerToUpdateWatcher();
    }
    readerToUpdateWatcher = $scope.$watch("readerToUpdate.filter", filterChangeWrapper($scope.readerToUpdate));
    angular.forEach($scope.readerToUpdate.fields, function(field) {
      $scope.readerFields[field.schemaMapping] = {
        value: field.name
      };
    });
    $scope.openModal("#updateReaderModal");
  };

  $scope.cancelUpdateReader = function() {
    $scope.readerToUpdate = {};
    $scope.readerFields = {};
    $scope.resetReaderForms();
  };

  $scope.confirmDeleteReader = function(reader) {
    $scope.readerToDelete = reader;
    $scope.openModal("#confirmDeleteReaderModal");
  };

  $scope.cancelDeleteReader = function() {
    $scope.readerToDelete = {};
    $scope.resetReaderForms();
  };

  $scope.deleteReader = function() {
    $scope.deletingReader = true;
    ReaderRepo.delete($scope.readerToDelete).then(function() {
      $scope.deletingReader = false;
      $scope.resetReaderForms();
    });
  };

  $scope.disableSubmit = function(form) {
    var invalidFields = $scope.internalMetadata.filter(function(metadatum) {
      return metadatum.required;
    }).filter(function(metadatum) {
      return $scope.readerFields[metadatum.field] === undefined;
    });
    return form.$invalid || invalidFields.length > 0;
  };

  ReaderRepo.ready().then(function() {
    $scope.setTable = function() {
      $scope.tableParams = new NgTableParams({
        count: $scope.readers.length,
        sorting: {name: 'desc'}
      }, {
        counts: [],
        total: 0,
        getData: function(params) {
          return $scope.readers;
        }
      });
    };
    $scope.setTable();
  });

});
