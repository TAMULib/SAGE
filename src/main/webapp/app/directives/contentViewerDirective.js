sage.directive("contentviewer", function() {
  var viewerMap = appConfig.contentMap;
  return {
    templateUrl: "views/directives/viewers/viewerWrapper.html",
    scope: {
      contentType: "=",
      resource: "="
    },
    link: function($scope) {
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
      
      if (viewerTemplate === 'seadragon') {
        var modifiedResource = $scope.resource.replace("/full/full/0/default.jpg", "/info.json");
        $scope.options = {};
        $scope.options.prefixUrl = 'resources/images/';
        $scope.options.tileSources = [modifiedResource];
      }
      $scope.includeTemplateUrl = "views/directives/viewers/"+viewerTemplate+"Viewer.html";
    },
    restrict: "E",
    transclude: true
  };
});
