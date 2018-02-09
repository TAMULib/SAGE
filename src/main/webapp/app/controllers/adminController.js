cap.controller('AdminController', function ($controller, $injector, $route, $scope) {
  
    angular.extend(this, $controller('CoreAdminController', {
        $scope: $scope
    }));

});