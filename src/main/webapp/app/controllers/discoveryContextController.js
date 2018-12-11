sage.controller('DiscoveryContextController', function ($controller, $scope, $routeParams, DiscoveryContext, Search, Field) {

  angular.extend(this, $controller('CoreAdminController', {
      $scope: $scope
  }));

  var discoveryContext = new DiscoveryContext({
    slug: $routeParams.slug,
    search: new Search()
  });

  discoveryContext.ready().then(function() {
    $scope.discoveryContext = discoveryContext;
  });

});