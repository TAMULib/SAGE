sage.model("SingleResultContext", function (WsApi) {
  return function SingleResultContext() {
    var singleResultContext = this;

    singleResultContext.before(function() {
      var method = singleResultContext.fullView ? "full":"load";
      var loadedPromise = WsApi.fetch(singleResultContext.getMapping()[method], {
        pathValues: {
          slug: singleResultContext.slug,
          resultId: singleResultContext.resultId
        }
      });
      loadedPromise.then(function(res) {
        var rc = angular.fromJson(res.body).payload.SingleResultContext;
        angular.extend(singleResultContext, rc);
      });
      return loadedPromise;
    });

    singleResultContext.getBreadcrumb = function() {
      return {
        label: singleResultContext.title.replace(/^\[(.*)]$/i, "$1"),
        path: "discovery-context/" + singleResultContext.slug + "/" + singleResultContext.resultId
      };
    };

    return singleResultContext;
  };
});
