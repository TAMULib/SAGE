sage.controller('IndexManagementController', function ($controller, $scope, NgTableParams) {
  
  angular.extend(this, $controller('AbstractController', {
      $scope: $scope
  }));

  $scope.startCreateIndex = function() {
    $scope.openModal("#createIndexModal");
  };

  $scope.createIndex = function() {
    console.log($scope.indexToCreate);
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