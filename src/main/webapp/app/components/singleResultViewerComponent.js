sage.component("singleResultViewer", {
  templateUrl: "views/components/singleResultViewer.html",
  bindings: {
    context: "="
  },
  controller: function($scope, $routeParams, $q, $timeout, $filter) {

    $scope.ready = false;

    var getContentType = function(url) {

      var defer = $q.defer();

      var extension;
      var ct = null;

      if(url) {
        extension = url.split('.').pop();
      }

      if (extension) {

        var keys = Object.keys(appConfig.contentMap);
        for(var i in keys) {
          var key = keys[i];
          var types = appConfig.contentMap[key];
          var index = types.indexOf(extension);
          if(index !== -1) {
            ct = types[index];
            break;
          }
        }
      }

      if (ct == null) {
        var xhttp = new XMLHttpRequest();
        xhttp.open('HEAD', url);
        xhttp.onreadystatechange = function () {
          if (this.readyState == this.DONE) {
            ct = this.getResponseHeader("Content-Type");
          }
        };
        xhttp.send();
      }

      defer.resolve(ct);

      return defer.promise;
    };

    $timeout(function() {
      $scope.singleResultContext = $scope.$ctrl.context;
      $scope.singleResultContext.ready().then(function() {
        var resourceUri = $filter("removeBrackets")($scope.singleResultContext.resourceLocationUri);

        getContentType(resourceUri).then(function(ct) {
          $scope.contentType = ct;
          $scope.ready = true;
        });
      });

    });

    $scope.singleResultMode = function() {
      return $routeParams.resultId != null;
    };
  }
});
