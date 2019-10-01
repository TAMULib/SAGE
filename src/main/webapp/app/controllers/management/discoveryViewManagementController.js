sage.controller('DiscoveryViewManagementController', function ($controller, $scope, $timeout, NgTableParams, DiscoveryView, DiscoveryViewRepo, SearchField, SourceRepo) {

  angular.extend(this, $controller('AbstractController', {
      $scope: $scope
  }));

  $scope.discoveryViews = DiscoveryViewRepo.getAll();
  $scope.sources = SourceRepo.getAll();
  $scope.metadataFields = [];

  $scope.active = {
    tab: 0
  };

  $scope.discoveryViewForms = {
    validations: DiscoveryViewRepo.getValidations(),
    getResults: DiscoveryViewRepo.getValidationResults
  };

  $scope.back = function() {
    if ($scope.active.tab > 0) {
      $scope.active.tab--;
    }
  };

  $scope.next = function() {
    if ($scope.active.tab < 3) {
      $scope.active.tab++;
    }
  };

  $scope.resetDiscoveryViewForms = function() {
    DiscoveryViewRepo.clearValidationResults();
    for (var key in $scope.discoveryViewForms) {
      if ($scope.discoveryViewForms[key] !== undefined && !$scope.discoveryViewForms[key].$pristine && $scope.discoveryViewForms[key].$setPristine) {
        $scope.discoveryViewForms[key].$setPristine();
      }
    }
    $scope.closeModal();
    $timeout(function() {
      angular.extend($scope.active, { tab: 0 });
    }, 250);
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

    var searchField = new SearchField();
    angular.extend(searchField, DiscoveryViewRepo.scaffoldSearchField);
    dv.searchFields.push(searchField);
  };

  $scope.startCreateDiscoveryView = function() {
    $scope.discoveryView = new DiscoveryView(DiscoveryViewRepo.getScaffold());
    $scope.populateSources($scope.discoveryView);
    $scope.getFields($scope.discoveryView);
    $scope.openModal("#createDiscoveryViewModal");
  };

  $scope.createDiscoveryView = function() {
    DiscoveryViewRepo.create($scope.discoveryView).then(function(res) {
      if(angular.fromJson(res.body).meta.status === "SUCCESS") {
        $scope.cancelCreateDiscoveryView();
      }
    });
  };

  $scope.cancelCreateDiscoveryView = function() {
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
    if (angular.isDefined($scope.discoveryView)) {
      var searchFields = $scope.discoveryView.searchFields;
      return (searchFields && (searchFields.$invalid || searchFields.length == 0));
    }
    return false;
  };

  $scope.startUpdateDiscoveryView = function(dv) {
    $scope.discoveryView = new DiscoveryView(angular.copy(dv));
    $scope.populateSources($scope.discoveryView);
    $scope.getFields($scope.discoveryView);
    $scope.openModal("#updateDiscoveryViewModal");
  };

  $scope.updateDiscoveryView = function() {
    $scope.updatingDiscoveryView = true;
    $scope.discoveryView.dirty(true);
    $scope.discoveryView.save().then(function() {
      $scope.resetDiscoveryViewForms();
      $scope.updatingDiscoveryView = false;
    });
  };

  $scope.cancelUpdateDiscoveryView = function() {
    $scope.resetDiscoveryViewForms();
  };

  $scope.confirmDeleteDiscoveryView = function(dv) {
    $scope.discoveryView = new DiscoveryView(dv);
    $scope.openModal("#confirmDeleteDiscoveryViewModal");
  };

  $scope.cancelDeleteDiscoveryView = function() {
    $scope.resetDiscoveryViewForms();
  };

  $scope.deleteDiscoveryView = function() {
    $scope.deletingDiscoveryView = true;
    $scope.discoveryView.dirty(true);
    $scope.discoveryView.delete().then(function() {
      $scope.deletingDiscoveryView = false;
      $scope.resetDiscoveryViewForms();
    });
  };

  $scope.getFields = function(dv) {
    if (angular.isDefined(dv) && angular.isDefined(dv.source) && angular.isDefined(dv.source.uri) && angular.isDefined(dv.filter)) {
      $scope.fields = SourceRepo.getAvailableFields(dv.source.uri, dv.filter);
    }
  };

  $scope.findFieldByKey = function(key) {
    var f = null;
    for (var i in $scope.fields) {
      var pf = $scope.fields[i];
      if (pf.name === key) {
        f = pf;
        break;
      }
    }
    return f;
  };

  $scope.populateSources = function(dv) {
    if (angular.isDefined($scope.sources) && $scope.sources.length > 0) {
      angular.extend(dv, { source: angular.copy($scope.sources[0]) });
    }
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
