sage.model("Source", function(WsApi, HttpMethodVerbs) {
  return function Source() {
    var core = this;

    core.testLocation = function(core) {
      var testLocationPromise = WsApi.fetch(core.getMapping().testLocation, {
        data: core
      });
      return testLocationPromise;
    };

    core.testAuthorization = function() {
      return $q(function(resolve) {
        resolve();
      });
    };

    return core;
  };
});
