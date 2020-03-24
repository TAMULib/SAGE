sage.controller('DiscoveryViewManagementController', function ($controller, $scope, $timeout, DiscoveryView, DiscoveryViewRepo, FacetField, MetadataField, NgTableParams, SearchField, SourceRepo) {

  angular.extend(this, $controller('AbstractController', {
    $scope: $scope
  }));

  $scope.discoveryViews = DiscoveryViewRepo.getAll();
  $scope.sources = SourceRepo.getAll();
  $scope.tabs = {
    active: 0,
    length: 4,
    completed: 0,
    inCreate: false,
    inUpdate: false
  };

  $scope.queryParsers = [ "", "EDISMAX", "DISMAX" ];
  $scope.queryOperands = [ "", "AND", "OR" ];

  $scope.discoveryViewForms = {
    validations: DiscoveryViewRepo.getValidations(),
    getResults: DiscoveryViewRepo.getValidationResults
  };

  $scope.stepTransitionRefresh = function(fromTab) {
    if (fromTab === 0) {
      if (angular.isDefined($scope.originalSourceName) && $scope.discoveryView.source.name !== $scope.originalSourceName) {
        $scope.getFields($scope.discoveryView);
        $scope.originalSourceName = $scope.discoveryView.source.name;
      } else if (angular.isDefined($scope.originalFilter) && $scope.discoveryView.filter !== $scope.originalFilter) {
        $scope.getFields($scope.discoveryView);
        $scope.originalFilter = $scope.discoveryView.filter;
      }
    }
  };

  $scope.back = function() {
    if ($scope.tabs.active > 0) {
      if ($scope.tabs.active > $scope.tabs.length) {
        $scope.tabs.active = $scope.tabs.length - 1;
      } else {
        $scope.tabs.active--;
      }
    } else {
      $scope.tabs.active = 0;
    }
  };

  $scope.next = function() {
    if ($scope.tabs.active < $scope.tabs.length) {
      if ($scope.tabs.active < 0) {
        $scope.tabs.active = 0;
      } else {
        $scope.stepTransitionRefresh($scope.tabs.active);
        $scope.tabs.active++;

        if ($scope.tabs.completed < $scope.tabs.active) {
          $scope.tabs.completed = $scope.tabs.active;
        }
      }
    } else {
      $scope.tabs.active = $scope.tabs.length - 1;
    }
  };

  $scope.isTransitionDenied = function(transitionTo) {
    if ($scope.tabs.inCreate) {
      if (transitionTo > 0 && $scope.isDiscoveryViewGeneralInvalid("create")) return true;
      if (transitionTo > 1 && $scope.isDiscoveryViewFacetsInvalid("create")) return true;
      if (transitionTo > 2 && $scope.isDiscoveryViewSearchInvalid("create")) return true;
      if (transitionTo > 3 && $scope.isDiscoveryViewResultsInvalid("create") || $scope.discoveryViewForms.create.$invalid) return true;
    } else if ($scope.tabs.inUpdate) {
      if (transitionTo > 0 && $scope.isDiscoveryViewGeneralInvalid("update")) return true;
      if (transitionTo > 1 && $scope.isDiscoveryViewFacetsInvalid("update")) return true;
      if (transitionTo > 2 && $scope.isDiscoveryViewSearchInvalid("update")) return true;
      if (transitionTo > 3 && $scope.isDiscoveryViewResultsInvalid("update") || $scope.discoveryViewForms.update.$invalid) return true;
    }

    return $scope.tabs.completed < transitionTo;
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
      angular.extend($scope.tabs, {
        active: 0,
        completed: 0,
        inCreate: false,
        inUpdate: false
      });

      delete $scope.discoveryView;
      delete $scope.originalSourceName;
      delete $scope.originalFilter;
    }, 250);
  };

  $scope.appendFacetFieldItem = function(dv) {
    if (!angular.isDefined(dv.facetFields)) {
      dv.facetFields = [];
    }

    var facetField = new FacetField();
    angular.extend(facetField, DiscoveryViewRepo.scaffoldFacetField);
    dv.facetFields.push(facetField);
  };

  $scope.appendSearchFieldItem = function(dv) {
    if (!angular.isDefined(dv.searchFields)) {
      dv.searchFields = [];
    }

    var searchField = new SearchField();
    angular.extend(searchField, DiscoveryViewRepo.scaffoldSearchField);
    dv.searchFields.push(searchField);
  };

  $scope.appendResultMetadataFieldItem = function(dv) {
    if (!angular.isDefined(dv.resultMetadataFields)) {
      dv.resultMetadataFields = [];
    }

    var metadataField = new MetadataField();
    angular.extend(metadataField, DiscoveryViewRepo.scaffoldMetadataField);
    dv.resultMetadataFields.push(metadataField);
  };

  $scope.refreshSource = function(dv) {
    if ($scope.tabs.active === 0) {
      $scope.pingSource(dv);
    }
    if ((angular.isDefined($scope.originalSourceName) && dv.source.name !== $scope.originalSourceName) || (angular.isDefined($scope.originalFilter) && dv.filter !== $scope.originalFilter)) {
      $scope.getFields(dv);
    }
  };

  $scope.startCreateDiscoveryView = function() {
    $scope.discoveryView = new DiscoveryView(DiscoveryViewRepo.getScaffold());

    $scope.appendFacetFieldItem($scope.discoveryView);
    $scope.appendSearchFieldItem($scope.discoveryView);
    $scope.appendResultMetadataFieldItem($scope.discoveryView);

    angular.extend($scope.discoveryView.searchFields[0], { key: "all_fields", label: "Everything" });

    if (angular.isDefined($scope.sources) && $scope.sources.length > 0) {
      angular.extend($scope.discoveryView, { source: angular.copy($scope.sources[0]) });

      $scope.originalSourceName = $scope.sources[0].name;
      $scope.originalFilter = $scope.filter;

      $scope.getFields($scope.discoveryView);
    }

    $scope.tabs.inCreate = true;
    $scope.openModal("#createDiscoveryViewModal");
  };

  $scope.createDiscoveryView = function() {
    // The first field cannot be deleted but if it is empty, consider it deleted.
    if ($scope.discoveryView.facetFields.length === 1 && $scope.discoveryView.facetFields[0].key === "") {
      $scope.discoveryView.facetFields.length = 0;
    }

    if ($scope.discoveryView.resultMetadataFields.length === 1 && $scope.discoveryView.resultMetadataFields[0].key === "") {
      $scope.discoveryView.resultMetadataFields.length = 0;
    }

    DiscoveryViewRepo.create($scope.discoveryView).then(function(res) {
      if (angular.fromJson(res.body).meta.status === "SUCCESS") {
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

  $scope.isDiscoveryViewResultsInvalid = function(key) {
    var primaryKey = $scope.discoveryViewForms[key].primaryKey;
    var primaryURI = $scope.discoveryViewForms[key].primaryURIKey;

    return (primaryKey && primaryKey.$invalid) ||
           (primaryURI && primaryURI.$invalid);
  };

  $scope.startUpdateDiscoveryView = function(dv) {
    $scope.discoveryView = new DiscoveryView(angular.copy(dv));
    $scope.originalSourceName = $scope.discoveryView.source.name;
    $scope.originalFilter = $scope.discoveryView.filter;

    if (dv.facetFields.length == 0) $scope.appendFacetFieldItem($scope.discoveryView);
    if (dv.searchFields.length == 0) $scope.appendSearchFieldItem($scope.discoveryView);
    if (dv.resultMetadataFields.length == 0) $scope.appendResultMetadataFieldItem($scope.discoveryView);

    $scope.getFields($scope.discoveryView);
    $scope.tabs.completed = $scope.tabs.length - 1;
    $scope.tabs.inUpdate = true;
    $scope.openModal("#updateDiscoveryViewModal");
  };

  $scope.updateDiscoveryView = function() {
    $scope.updatingDiscoveryView = true;

    // The first field cannot be deleted but if it is empty, consider it deleted.
    if ($scope.discoveryView.facetFields.length === 1 && $scope.discoveryView.facetFields[0].key === "") {
      $scope.discoveryView.facetFields.length = 0;
    }

    if ($scope.discoveryView.resultMetadataFields.length === 1 && $scope.discoveryView.resultMetadataFields[0].key === "") {
      $scope.discoveryView.resultMetadataFields.length = 0;
    }

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
    if (angular.isDefined(dv) && angular.isDefined(dv.source) && angular.isDefined(dv.source.uri)) {
      var filter = angular.isDefined(dv.filter) && dv.filter.length > 0 ? dv.filter : "";
      if (dv.source.requiresFilter && filter.length === 0) {
        filter = "*.*";
      }
      $scope.fields = SourceRepo.getAvailableFields(dv.source.uri, filter);
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

  $scope.pingSource = function(dv) {
    if (angular.isDefined(dv.source)) {
      dv.source.testPing();
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
