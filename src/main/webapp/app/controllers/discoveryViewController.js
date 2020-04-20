sage.controller('DiscoveryViewController', function ($controller, $scope, DiscoveryViewRepo, NgTableParams) {

  angular.extend(this, $controller('AbstractController', {
    $scope: $scope
  }));

  $scope.discoveryViews = DiscoveryViewRepo.getAll();

  DiscoveryViewRepo.ready().then(function() {
    $scope.setTable = function() {
      $scope.tableParams = new NgTableParams({
        count: $scope.discoveryViews.length,
        sorting: {name: 'desc'}
      }, {
        counts: [],
        total: 0,
        getData: function(params) {
          return $scope.discoveryViews;
        }
      });
    };
    $scope.setTable();
  });

});
