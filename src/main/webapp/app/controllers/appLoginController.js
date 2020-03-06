sage.controller('AppLoginController', function ($controller, $scope) {

  angular.extend(this, $controller('AuthenticationController', {
    $scope: $scope
  }));

  $scope.checkAuthStrategy = function (strategy) {
    return (appConfig.authStrategies.indexOf(strategy) > -1);
  };

  $scope.isExternalEnabled = function () {
    return $scope.checkAuthStrategy('weaverAuth');
  };

  $scope.isEmailEnabled = function () {
    return $scope.checkAuthStrategy('emailRegistration');
  };

});
