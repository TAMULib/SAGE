sage.controller('SolrCoreManagementController', function ($controller, $scope, NgTableParams, SolrCoreRepo) {
  
  angular.extend(this, $controller('AbstractController', {
      $scope: $scope
  }));

  $scope.solrCores = SolrCoreRepo.getAll();

  $scope.solrCoreToCreate = SolrCoreRepo.getScaffold();

  $scope.solrCoreForms = {
    validations: SolrCoreRepo.getValidations(),
    getResults: SolrCoreRepo.getValidationResults
  };

  $scope.resetSolrCoreForms = function() {
    SolrCoreRepo.clearValidationResults();
    for (var key in $scope.solrCoreForms) {
      if ($scope.solrCoreForms[key] !== undefined && !$scope.solrCoreForms[key].$pristine && $scope.solrCoreForms[key].$setPristine) {
        $scope.solrCoreForms[key].$setPristine();
      }
    }
    $scope.closeModal();
  };

  $scope.startCreateSolrCore = function() {
    $scope.openModal("#createSolrCoreModal");
  };

  $scope.createSolrCore = function() {
    console.log($scope.solrCoreToCreate);
    SolrCoreRepo.create($scope.solrCoreToCreate).then(function(res) {
      if(angular.fromJson(res.body).meta.status === "SUCCESS") {
        $scope.cancelCreateSolrCore();
      }
    });
  };

  $scope.cancelCreateSolrCore = function() {
    angular.extend($scope.solrCoreToCreate, SolrCoreRepo.getScaffold());
    $scope.resetSolrCoreForms();
    $scope.closeModal();
  };

  SolrCoreRepo.ready().then(function() {
    $scope.setTable = function() {
      $scope.tableParams = new NgTableParams({
        count: $scope.solrCores.length,
        sorting: {name: 'desc'}
      }, {
        counts: [],
        total: 0,
        getData: function(params) {
          return $scope.solrCores;
        }
      });
    };
    $scope.setTable();
  });

});