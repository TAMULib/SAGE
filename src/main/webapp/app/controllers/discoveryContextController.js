sage.controller('DiscoveryContextController', function ($controller, $scope, $routeParams, DiscoveryContext) {

  angular.extend(this, $controller('CoreAdminController', {
      $scope: $scope
  }));

  var discoveryContext = new DiscoveryContext({
    slug: $routeParams.slug
  });

  discoveryContext.ready().then(function() {
    $scope.discoveryContext = discoveryContext;
  });

});