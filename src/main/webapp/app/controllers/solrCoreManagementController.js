sage.controller('SolrCoreManagementController', function ($controller, $scope, NgTableParams, SolrCoreRepo) {
  
  angular.extend(this, $controller('AbstractController', {
      $scope: $scope
  }));

  $scope.solrCores = SolrCoreRepo.getAll();

  $scope.startCreateSolrCore = function() {
    $scope.openModal("#createSolrCoreModal");
  };

  $scope.createSolrCore = function() {
    console.log($scope.solrCoreToCreate);
    SolrCoreRepo.create($scope.solrCoreToCreate).then(function(res) {
      if(angular.fromJson(res.body).meta.status === "SUCCESS") {
        $scope.cancelCreateSolrCore();
      }
    })
    resetCreateModal();
  };

  $scope.cancelCreateSolrCore = function() {
    resetCreateModal();
  };

  var resetCreateModal = function() {
    $scope.closeModal();
    $scope.solrCoreToCreate = {};
  };

  resetCreateModal();

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
  })

});