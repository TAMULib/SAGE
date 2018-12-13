sage.controller('SingleResultController', function ($controller, $scope, $routeParams) {

    angular.extend(this, $controller('CoreAdminController', {
        $scope: $scope
    }));

    console.log($routeParams);

    $scope.resultTitle = $routeParams.resultId;

});
