sage.controller('AdminController', function ($controller, $scope) {
  
    angular.extend(this, $controller('CoreAdminController', {
        $scope: $scope
    }));

});