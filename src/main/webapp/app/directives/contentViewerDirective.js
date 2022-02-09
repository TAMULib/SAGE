sage.directive("contentviewer", function($filter, $sce, appConfig) {
  var viewerMap = appConfig.contentMap;
  return {
    templateUrl: "views/directives/viewers/viewerWrapper.html",
    scope: {
      contentType: "=",
      context: "=",
      format: "="
    },
    link: function($scope) {
      var viewerTemplate = 'default';

      if ($scope.contentType === 'manifest') {
        viewerTemplate = 'mirador';
        $scope.resource = $filter("removeBrackets")($scope.context.manifestUri);
      } else {
        for (var type in viewerMap) {
          if (viewerMap[type].indexOf($scope.contentType) >= 0) {
            viewerTemplate = type;
            break;
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
          Mirador.viewer({
            id: 'mirador-wrapper',
            manifests: [{
              manifestUri: $scope.resource,
              location: "TAMU"
            }],
            mainMenuSettings: {
              show: false
            },
            windows: [{
              loadedManifest: $scope.resource,
              viewType: 'ImageView',
              displayLayout: false,
              bottomPanel: true,
              bottomPanelAvailable: false,
              bottomPanelVisible: false,
              sidePanel: false,
              annotationLayer: false
            }]
          });
        };
      }

      if (viewerTemplate === 'avalon') {
        $scope.resource = $sce.trustAsResourceUrl(
          `//${appConfig.avalonUrl}/master_files/${$filter("removeBrackets")($scope.context.resourceLocationUri)}/embed`
        );

        if (appConfig.audioVideoMap.audio === $scope.format) {
          $scope.height = "40";
        } else if (appConfig.audioVideoMap.video === $scope.format) {
          $scope.height = "450";
        } else {
          $scope.height = "450";
        }
      }

      $scope.includeTemplateUrl = "views/directives/viewers/"+viewerTemplate+"Viewer.html";
    },
    restrict: "E",
    transclude: true
  };
});
