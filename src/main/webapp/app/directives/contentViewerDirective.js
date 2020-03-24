sage.directive("contentviewer", function($filter) {
  var viewerMap = appConfig.contentMap;
  return {
    templateUrl: "views/directives/viewers/viewerWrapper.html",
    scope: {
      contentType: "=",
      context: "="
    },
    link: function($scope) {
      var viewerTemplate = 'default';

      if ($scope.contentType === 'manifest') {
        viewerTemplate = 'mirador';
        $scope.resource = $filter("removeBrackets")($scope.context.manifestUri);
      } else {
        typeLoop:
        for (var type in viewerMap) {
          for (var supportedType in viewerMap[type]) {
            if ($scope.contentType === viewerMap[type][supportedType]) {
              viewerTemplate = type;
              break typeLoop;
            }
          }
        }
        $scope.resource = $filter("removeBrackets")($scope.context.resourceLocationUri);
      }

      if (viewerTemplate === 'seadragon') {
        $scope.options = {};
        $scope.options.prefixUrl = 'resources/images/';
        $scope.options.tileSources = [$scope.resource];
      }
     
      if (viewerTemplate === 'mirador') {
        $scope.loadViewer = function () {
          Mirador({
            id: 'mirador-wrapper',
            data: [{ 
              manifestUri: $scope.resource,
              location: "TAMU"
            }],
            mainMenuSettings: {
              show: false
            },
            windowObjects: [{
              loadedManifest: $scope.resource,
              viewType: 'ImageView',
              displayLayout: false,
              bottomPanel: false,
              bottomPanelAvailable: false,
              bottomPanelVisible: false,
              sidePanel: false,
              annotationLayer: false
            }]
          });
        };
      }

      $scope.includeTemplateUrl = "views/directives/viewers/"+viewerTemplate+"Viewer.html";
    },
    restrict: "E",
    transclude: true
  };
});
