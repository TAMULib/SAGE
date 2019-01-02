sage.component("singleResultViewer", {
  templateUrl: "views/components/singleResultViewer.html",
  bindings: {},
  controller: function($scope, $routeParams, SingleResultContextService, $q) {

    $scope.ready = false;

    var getContentType = function(url) {

      var defer = $q.defer();
    
      var extension;
    
      if(url) {
        extension = url.split('.').pop(); 
      }
      
      if(extension) {
        var ct = "default";
        var keys = Object.keys(appConfig.contentMap);
        for(var i in keys) {
          var key = keys[i]
          var types = appConfig.contentMap[key];
          var index = types.indexOf(extension);
          if(index !== -1) {
            defer.resolve(types[index] || ct);
            break;
          }
        }
      } else {
        var xhttp = new XMLHttpRequest();
        xhttp.open('HEAD', url);
        xhttp.onreadystatechange = function () {
            if (this.readyState == this.DONE) {
                var ct = this.getResponseHeader("Content-Type");
                defer.resolve(ct);
            }
        };
        xhttp.send();
      }
      
      return defer.promise;
    };

    $scope.singleResultMode = function() {
      return $routeParams.resultId != null;
    };

    SingleResultContextService.getSingleResult().then(function(sr) {
      
      $scope.singleResultContext = sr;

      getContentType().then(function(ct) {
        console.log(ct);
        $scope.contentType = ct;
        $scope.ready = true;
      });
      
      console.log($scope.singleResultContext);

    });

  }
});

sage.service("SingleResultContextService", function($q) {

    var singleResultContextService = this;
    
    var defer;

    var singleResult;

    singleResultContextService.getSingleResult = function() {

      defer = $q.defer();

      if(singleResult) {
        defer.resolve(singleResult);
      }
 
      return defer.promise;
    };

    singleResultContextService.setSingleResult = function(sr, trigger) {
      trigger = false;
      singleResult = sr;
      if(defer) defer.resolve(singleResult);
      trigger = true;
    };

});