sage.controller('ReaderManagementController', function ($controller, $scope, NgTableParams, ReaderRepo, SourceRepo) {

  angular.extend(this, $controller('AbstractController', {
      $scope: $scope
  }));

  $scope.readers = ReaderRepo.getAll();
  $scope.sources = SourceRepo.getAll();
  $scope.metadataFields = [];

  $scope.readerToCreate = ReaderRepo.getScaffold();
  $scope.newReaderFields = {};
  $scope.readerToUpdate = {};
  $scope.readerToDelete = {};


  $scope.readerForms = {
    validations: ReaderRepo.getValidations(),
    getResults: ReaderRepo.getValidationResults
  };

  ReaderRepo.getMetadataFields($scope.metadataFields);

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

  $scope.createReader = function() {
    var fields = [];
    angular.forEach($scope.newReaderFields, function(valueObj,key) {
        this.push({"name":valueObj.value,"schemaMapping": key});
    },fields);
    $scope.readerToCreate.fields = fields;

    ReaderRepo.create($scope.readerToCreate).then(function(res) {
      if(angular.fromJson(res.body).meta.status === "SUCCESS") {
        $scope.cancelCreateReader();
      }
    });
  };

  $scope.cancelCreateReader = function() {
    angular.extend($scope.readerToCreate, ReaderRepo.getScaffold());
    $scope.newReaderFields = {};
    $scope.resetReaderForms();
  };

  $scope.updateReader = function() {
    $scope.updatingReader = true;
    $scope.readerToUpdate.dirty(true);
    $scope.readerToUpdate.save().then(function() {
      $scope.resetReaderForms();
      $scope.updatingReader = false;
    });
  };

  $scope.startUpdateReader = function(reader) {
    $scope.readerToUpdate = reader;
    $scope.openModal("#updateReaderModal");
  };

  $scope.cancelUpdateReader = function(reader) {
    $scope.readerToUpdate = {};
    $scope.resetReaderForms();
  };

  $scope.confirmDeleteReader = function(reader) {
    $scope.readerToDelete = reader;
    $scope.openModal("#confirmDeleteReaderModal");
  };

  $scope.cancelDeleteReader = function(reader) {
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
