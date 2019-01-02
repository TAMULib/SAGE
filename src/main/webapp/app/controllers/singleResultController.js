sage.controller('SingleResultController', function ($controller, $scope, $routeParams, SingleResultContext) {

    angular.extend(this, $controller('CoreAdminController', {
        $scope: $scope
    }));

    var singleResultContext = new SingleResultContext({
      slug: $routeParams.slug,
      resultId: $routeParams.resultId,
    });

    $scope.singleResultContext = singleResultContext;

});
