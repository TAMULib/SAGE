sage.directive("contentviewer", function($filter) {
  var viewerMap = appConfig.contentMap;

  return {
      templateUrl: "views/directives/viewers/viewerWrapper.html",
      scope: {
        contentType: "=",
        resource: "="
      },
      link:
          function($scope) {
              var viewerTemplate = "default";

              typeLoop:
              for (var type in viewerMap) {
                  for (var supportedType in viewerMap[type]) {
                      if ($scope.contentType === viewerMap[type][supportedType]) {
                          viewerTemplate = type;
                          break typeLoop;
                      }
                  }
              }

              if (viewerTemplate == 'seadragon') {
                $scope.options = {};
                $scope.options.prefixUrl = 'resources/images/';
                $scope.options.tileSources = [$filter("cantaloupeUrl")($scope.resource)];
              }
              $scope.includeTemplateUrl = "views/directives/viewers/"+viewerTemplate+"Viewer.html";
          },
      restrict: "E",
      transclude: true
  };
});