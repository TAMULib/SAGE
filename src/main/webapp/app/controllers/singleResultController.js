sage.controller('SingleResultController', function ($controller, $q, $routeParams, $scope, DiscoveryContext, SingleResultContext) {

  angular.extend(this, $controller('CoreAdminController', {
    $scope: $scope
  }));

  $scope.discoveryContext = new DiscoveryContext({
    slug: $routeParams.slug,
  });

  $scope.setResultContext = function(fullView) {
    $scope.singleResultContext = new SingleResultContext({
      slug: $routeParams.slug,
      resultId: $routeParams.resultId,
      fullView: fullView
    });
  }

  $scope.setResultContext(false);

  $q.all([$scope.discoveryContext.ready(), $scope.singleResultContext.ready()]).then(function() {
    $scope.breadcrumbContexts = [
      $scope.discoveryContext,
      $scope.singleResultContext
    ];
  });
});
