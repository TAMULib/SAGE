sage.model("SolrCore", function(WsApi, HttpMethodVerbs) {
  return function SolrCore() {
    var solrCore = this;

    solrCore.testLocation = function(core) {
      var testLocationPromise = WsApi.fetch(solrCore.getMapping().testLocation, {
        data: core
      });
      return testLocationPromise;
    };

    solrCore.testAuthorization = function() {
      return $q(function(resolve) {
        resolve();
      });
    };

    return solrCore;
  };
});