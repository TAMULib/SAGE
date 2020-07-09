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
        var specialKeys = ["title", "manifestUri", "resourceLocationUri", "resourceThumbnailUri", "uniqueIdentifier"];
        angular.forEach(specialKeys, function(key) {
          if (rc[key]) {
            rc[key] = JSON.parse(rc[key])[0];
          }
        });

        angular.forEach(rc.resultMetadataFields, function(field, fieldName) {
          if (field.value.startsWith("[") && field.value.endsWith("]")) {
            field.value = JSON.parse(field.value);
          }
        });
        angular.extend(singleResultContext, rc);
      });
      return loadedPromise;
    });

    singleResultContext.getBreadcrumb = function() {
      return {
        label: singleResultContext.title,
        path: "discovery-context/" + singleResultContext.slug + "/" + singleResultContext.resultId
      };
    };

    return singleResultContext;
  };
});
