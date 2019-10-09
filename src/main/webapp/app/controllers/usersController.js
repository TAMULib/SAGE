sage.controller('UsersController', function ($controller, $location, $injector, $scope, $route, StorageService, UserService) {

  angular.extend(this, $controller('AbstractController', {$scope: $scope}));

  $scope.user = UserService.getCurrentUser();

  UserService.userReady().then(function() {

    $scope.assignableRoles = function(userRole) {
      if ($scope.isAdmin()) {
        return ['ROLE_ADMIN','ROLE_MANAGER','ROLE_USER'];
      }
      else if ($scope.isManager()) {
        if (userRole == 'ROLE_ADMIN') {
          return ['ROLE_ADMIN'];
        }
        return ['ROLE_MANAGER','ROLE_USER'];
      }
      else {
        return [userRole];
      }
    };

    $scope.canDelete = function(user) {
        var canDelete;
        if ($scope.isAdmin()) {
          canDelete = true;
        }
        else if ($scope.isManager()) {
          if (user.role == "ROLE_ADMIN") {
            canDelete = false;
          }
          else {
            canDelete = true;
          }
        }
        else {
          canDelete = false;
        }
        if (user.uin == $scope.user.uin) {
          canDelete = false;
        }
        return canDelete;
    };

    if ($scope.isAdmin() || $scope.isManager()) {

        var UserRepo = $injector.get("UserRepo");

        $scope.userUpdated = {};

        $scope.users = UserRepo.getAll();

        $scope.updateRole = function(user) {

          angular.extend($scope.userUpdated, user);

          user.save();

          if ($scope.user.username == user.username) {
            if (user.role == 'ROLE_USER') {
              $location.path('/myview');
            }
            else {}
          }
        };

        $scope.delete = function(user) {
          user.delete();
        };

        UserRepo.listen(function(response) {
          $scope.userUpdated = {};
          $route.reload();
        });

    }

  });

});
