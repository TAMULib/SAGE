sage.controller('SingleResultController', function ($controller, $scope, $routeParams, SingleResultContext, appConfig) {

    angular.extend(this, $controller('CoreAdminController', {
        $scope: $scope
    }));

    var singleResultContext = new SingleResultContext({
      slug: $routeParams.slug,
      resultId: $routeParams.resultId,
    });
  
    $scope.getContentType = function(url) {
      var contentType, extension;

      if(url) {
        extension = url.split('.').pop(); 
        console.log(extension);
      }
      
      if(extension) {
        contentType = extension;
      } else {
        var xhttp = new XMLHttpRequest();
        xhttp.open('HEAD', url);
        xhttp.onreadystatechange = function () {
            if (this.readyState == this.DONE) {
                console.log(this.status);
                var t = this.getResponseHeader("Content-Type");
                console.log(t);
                contentType = t;
            }
        };
        xhttp.send();
      }

      return contentType;
    };

    $scope.singleResultContext = singleResultContext;

});
