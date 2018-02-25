sage.controller('AdminController', function ($controller, $scope, IndexRepo) {
  
    angular.extend(this, $controller('CoreAdminController', {
        $scope: $scope
    }));

    $scope.indexToDelete = {};
    $scope.indexToEdit = {};

    $scope.resetIndexForms = function() {
        IndexRepo.clearValidationResults();
    }

});