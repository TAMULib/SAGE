sage.controller('IndexManagementController', function ($controller, $scope, NgTableParams, IndexRepo) {
  
  angular.extend(this, $controller('AbstractController', {
      $scope: $scope
  }));

  $scope.startCreateIndex = function() {
    $scope.openModal("#createIndexModal");
  };

  $scope.createIndex = function() {
    console.log($scope.indexToCreate);
    IndexRepo.create($scope.indexToCreate).then(function(res) {
      if(angular.fromJson(res.body).meta.status === "SUCCESS") {
        $scope.cancelCreateIndex();
      }
    })
    resetCreateModal();
  };

  $scope.cancelCreateIndex = function() {
    resetCreateModal();
  };

  var resetCreateModal = function() {
    $scope.closeModal();
    $scope.indexToCreate = {};
  };

  resetCreateModal();

});