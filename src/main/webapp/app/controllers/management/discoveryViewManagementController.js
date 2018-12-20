sage.controller('DiscoveryViewManagementController', function ($controller, $scope, $timeout, $element, NgTableParams, DiscoveryViewRepo, SourceRepo) {

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
      console.log($scope.discoveryViewToCreate, angular.fromJson(res.body));
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

  $scope.createDiscoveryViewGeneralIsInvalid = function() {

    var createName = $scope.discoveryViewForms.create.name;
    var createSource = $scope.discoveryViewForms.create.source;
    var createFilter = $scope.discoveryViewForms.create.filter;
    var createSlug = $scope.discoveryViewForms.create.slug;

    return  (createName && createName.$invalid) ||
            (createSource && createSource.$invalid) ||
            (createFilter && createFilter.$invalid) ||
            (createSlug && createSlug.$invalid);
  };

  $scope.createDiscoveryViewResultsIsInvalid = function() {

    var createPrimaryKey = $scope.discoveryViewForms.create.primaryKey;
    var createPrimaryURI = $scope.discoveryViewForms.create.primaryURIKey;

    return  (createPrimaryKey && createPrimaryKey.$invalid) ||
            (createPrimaryURI && createPrimaryURI.$invalid);
            
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

  $scope.getFields = function(discoveryView) {
    $scope.fields = DiscoveryViewRepo.getFields(discoveryView);
    console.log($scope.fields);
  };

  $scope.findFieldByKey = function(key) {
    var f = null;
    for(var i in $scope.fields) {
      var pf = $scope.fields[i];
      if(pf.name===key) {
        f = pf;
        break;
      }
    }
    return f;
  };

  $scope.onSelect = function($event) {
    $timeout(function () {
        console.log($event);
        // var control = $element.find($event.currentTarget).controller('ngModel');
        // control.$setViewValue(''); // Replicate an on change event
        // control.$setViewValue("foooo");
        // control.$render();
    }, 0);
    return false;
  };

  SourceRepo.ready().then(function() {
    if($scope.sources.length > 0) {
      $scope.discoveryViewToCreate.source = $scope.sources[0];
      $scope.discoveryViewToUpdate.source = $scope.sources[0];
    }
  });

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
