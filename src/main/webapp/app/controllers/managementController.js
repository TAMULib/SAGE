sage.controller('ManagementController', function ($controller, $scope) {

    angular.extend(this, $controller('CoreAdminController', {
        $scope: $scope
    }));

});
