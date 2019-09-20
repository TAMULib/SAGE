sage.controller('DiscoveryViewManagementController', function ($controller, $scope, NgTableParams, DiscoveryViewRepo, SourceRepo) {

  angular.extend(this, $controller('AbstractController', {
      $scope: $scope
  }));

  $scope.discoveryViews = DiscoveryViewRepo.getAll();
  $scope.sources = SourceRepo.getAll();
  $scope.metadataFields = [];

  $scope.discoveryViewToCreate = DiscoveryViewRepo.getScaffold();
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

  $scope.appendFacetFieldItem = function(dv) {
    if (!angular.isDefined(dv.facetFields)) {
      dv.facetFields = [];
    }

    dv.facetFields.push({});
  };

  $scope.appendSearchFieldItem = function(dv) {
    if (!angular.isDefined(dv.searchFields)) {
      dv.searchFields = [];
    }

    dv.searchFields.push(DiscoveryViewRepo.scaffoldSearchField);
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

  $scope.isDiscoveryViewGeneralInvalid = function(key) {
    var name = $scope.discoveryViewForms[key].name;
    var source = $scope.discoveryViewForms[key].source;
    var filter = $scope.discoveryViewForms[key].filter;
    var slug = $scope.discoveryViewForms[key].slug;

    return (name && name.$invalid) ||
           (source && source.$invalid) ||
           (filter && filter.$invalid) ||
           (slug && slug.$invalid);
  };

  $scope.isDiscoveryViewResultsInvalid = function(key) {
    var primaryKey = $scope.discoveryViewForms[key].primaryKey;
    var primaryURI = $scope.discoveryViewForms[key].primaryURIKey;

    return (primaryKey && primaryKey.$invalid) ||
           (primaryURI && primaryURI.$invalid);
  };

  $scope.isDiscoveryViewFacetsInvalid = function(key) {
    return false;
  };

  $scope.isDiscoveryViewSearchInvalid = function(key) {
    var searchFields = $scope.discoveryViewToUpdate.searchFields;
    return (searchFields && (searchFields.$invalid || searchFields.length == 0));
  };

  $scope.updateDiscoveryView = function() {
    $scope.updatingDiscoveryView = true;
    $scope.discoveryViewToUpdate.dirty(true);
    $scope.discoveryViewToUpdate.save().then(function() {
      $scope.resetDiscoveryViewForms();
      $scope.updatingDiscoveryView = false;
    });
  };

  $scope.startUpdateDiscoveryView = function(dv) {
    $scope.discoveryViewToUpdate = dv;
    $scope.getFields(dv);
    $scope.openModal("#updateDiscoveryViewModal");
  };

  $scope.cancelUpdateDiscoveryView = function() {
    $scope.discoveryViewToUpdate = {};
    $scope.resetDiscoveryViewForms();
  };

  $scope.confirmDeleteDiscoveryView = function(dv) {
    $scope.discoveryViewToDelete = dv;
    $scope.openModal("#confirmDeleteDiscoveryViewModal");
  };

  $scope.cancelDeleteDiscoveryView = function() {
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

  $scope.getFields = function(dv) {
    if (angular.isDefined(dv)) {
      $scope.fields = SourceRepo.getAvailableFields(dv.source.uri, dv.filter);
    }
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
