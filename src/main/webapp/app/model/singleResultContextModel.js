sage.model("SingleResultContext", function (WsApi) {
  return function SingleResultContext() {
    var model = this;

    model.before(function() {
      var loadedPromise = WsApi.fetch(model.getMapping().load, {
        pathValues: {
          slug: model.slug,
          resultId: model.resultId
        }
      });
      loadedPromise.then(function(res) {
        var rc = angular.fromJson(res.body).payload.SingleResultContext;
        angular.extend(model, rc);
      });
      return loadedPromise;
    });

    model.getBreadcrumb = function() {
      return {
        label: model.title.replace(/^\[(.*)]$/i, "$1"),
        path: "discovery-context/" + model.slug + "/" + model.resultId
      };
    };

    return model;
  };
});
