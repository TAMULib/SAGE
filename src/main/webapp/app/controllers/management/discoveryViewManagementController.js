sage.controller('DiscoveryViewManagementController', function ($controller, $scope, NgTableParams, DiscoveryViewRepo, SourceRepo) {

  angular.extend(this, $controller('AbstractController', {
      $scope: $scope
  }));

  $scope.discoveryViews = DiscoveryViewRepo.getAll();
  $scope.sources = SourceRepo.getAll();
  $scope.metadataFields = [];

  $scope.discoveryViewToCreate = DiscoveryViewRepo.getScaffold();
  $scope.newDiscoveryViewMappings = {};
  $scope.discoveryViewToUpdate = {};
  $scope.discoveryViewToDelete = {};


  $scope.discoveryViewForms = {
    validations: DiscoveryViewRepo.getValidations(),
    getResults: DiscoveryViewRepo.getValidationResults
  };

  $scope.resetDiscoveryViewForms = function() {
    DiscoveryViewRepo.clearValidationResults();
    for (var key in $scope.discoveryViewForms) {
      if ($scope.discoveryViewForms[key] !== undefined && !$scope.discoveryViewForms[key].$pristine && $scope.discoveryViewForms[key].$setPristine) {
        $scope.discoveryViewForms[key].$setPristine();
      }
    }
    $scope.closeModal();
  };

  $scope.startCreateDiscoveryView = function() {
    $scope.openModal("#createDiscoveryViewModal");
  };

  $scope.createDiscoveryView = function() {
    DiscoveryViewRepo.create($scope.discoveryViewToCreate).then(function(res) {
      if(angular.fromJson(res.body).meta.status === "SUCCESS") {
        $scope.cancelCreateDiscoveryView();
      }
    });
  };

  $scope.cancelCreateDiscoveryView = function() {
    angular.extend($scope.discoveryViewToCreate, DiscoveryViewRepo.getScaffold());
    $scope.newDiscoveryViewFields = {};
    $scope.resetDiscoveryViewForms();
  };

  $scope.updateDiscoveryView = function() {
    $scope.updatingDiscoveryView = true;
    $scope.discoveryViewToUpdate.dirty(true);
    $scope.discoveryViewToUpdate.save().then(function() {
      $scope.resetDiscoveryViewForms();
      $scope.updatingDiscoveryView = false;
    });
  };

  $scope.startUpdateDiscoveryView = function(reader) {
    $scope.discoveryViewToUpdate = reader;
    $scope.openModal("#updateDiscoveryViewModal");
  };

  $scope.cancelUpdateDiscoveryView = function(reader) {
    $scope.discoveryViewToUpdate = {};
    $scope.resetDiscoveryViewForms();
  };

  $scope.confirmDeleteDiscoveryView = function(reader) {
    $scope.discoveryViewToDelete = reader;
    $scope.openModal("#confirmDeleteDiscoveryViewModal");
  };

  $scope.cancelDeleteDiscoveryView = function(reader) {
    $scope.discoveryViewToDelete = {};
    $scope.resetDiscoveryViewForms();
  };

  $scope.deleteDiscoveryView = function() {
    $scope.deletingDiscoveryView = true;
    DiscoveryViewRepo.delete($scope.discoveryViewToDelete).then(function() {
      $scope.deletingDiscoveryView = false;
      $scope.resetDiscoveryViewForms();
    });
  };

  DiscoveryViewRepo.ready().then(function() {
    $scope.setTable = function() {
      $scope.tableParams = new NgTableParams({
        count: $scope.discoveryViews.length,
        sorting: {name: 'desc'}
      }, {
        counts: [],
        total: 0,
        getData: function(params) {
          return $scope.discoveryViews;
        }
      });
    };
    $scope.setTable();
  });

});
