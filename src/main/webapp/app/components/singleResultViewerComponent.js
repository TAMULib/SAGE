sage.component("singleResultViewer", {
  templateUrl: "views/components/singleResultViewer.html",
  bindings: {
    context: "="
  },
  controller: function($scope, $routeParams, $q, $timeout, $filter) {

    $scope.ready = false;

    var getContentType = function(url) {
      return $q(function(resolve, reject) {

        if (url === undefined) {
          // probably should reject
          resolve(null);
          return;
        }

        var extension = url.split('.').pop();

        if (extension) {
          var keys = Object.keys(appConfig.contentMap);
          for (var i in keys) {
            var key = keys[i];
            var types = appConfig.contentMap[key];
            var index = types.indexOf(extension);
            if (index >= 0) {
              resolve(types[index]);
              return;
            }
          }
        }

        var xhttp = new XMLHttpRequest();
        xhttp.open('HEAD', url);
        xhttp.onreadystatechange = function () {
          if (this.readyState === 4) {
            if(this.status === 200) {
              resolve(this.getResponseHeader("Content-Type"));
            } else {
              resolve(null);
            }
          }
        };
        xhttp.send();

      });
    };

    $timeout(function() {
      $scope.singleResultContext = $scope.$ctrl.context;
      $scope.singleResultContext.ready().then(function() {
        if ($scope.singleResultContext.manifestUri) {
          $scope.contentType = 'manifest';
          $scope.ready = true;
        } else {
          var resourceUri = $filter("removeBrackets")($scope.singleResultContext.resourceLocationUri);
          getContentType(resourceUri).then(function(ct) {
            $scope.contentType = ct;
            $scope.ready = true;
          });
        }
      });
    });

    $scope.singleResultMode = function() {
      return $routeParams.resultId != null;
    };

  }
});
