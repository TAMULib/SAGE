sage.config(function ($locationProvider, $routeProvider) {

      $locationProvider.html5Mode(true);

      $routeProvider.
      when('/', {
        templateUrl: 'views/splash.html'
      }).
      when('/home', {
        redirectTo: '/',
      }).
      when('/management', {
        redirectTo: '/management/sources',
      }).
      when('/management/:tab', {
        templateUrl: 'views/management.html',
        controller: 'ManagementController',
        access: ["ROLE_ADMIN", "ROLE_MANAGER"]
      }).
      when('/discovery-context/:slug', {
        templateUrl: 'views/discovery/discovery-context.html',
        controller: 'DiscoveryContextController',
        reloadOnSearch: false
      }).
      when('/discovery-context/:slug/:resultId', {
        templateUrl: 'views/discovery/single-result.html',
        controller: 'SingleResultController',
        reloadOnSearch: false
      }).
      
      when('/users', {
          templateUrl: 'views/users.html'
      }).
      when('/register', {
        templateUrl: 'views/register.html'
      }).
      // Error Routes
      when('/error/403', {
          templateUrl: 'views/errors/403.html',
          controller: 'ErrorPageController'
      }).
      when('/error/404', {
          templateUrl: 'views/errors/404.html',
          controller: 'ErrorPageController'

      }).
      when('/error/500', {
          templateUrl: 'views/errors/500.html',
          controller: 'ErrorPageController'
      }).
      otherwise({
          redirectTo: '/error/404'
      });

  });
