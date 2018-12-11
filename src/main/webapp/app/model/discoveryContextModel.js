sage.model("DiscoveryContext", function ($q, HttpMethodVerbs, WsApi, Result) {
  return function DiscoveryContext() {

    var discoveryContext = this;

    var fetchContext = function () {
      return WsApi.fetch(discoveryContext.getMapping().load, {
        method: HttpMethodVerbs.GET,
        pathValues: {
          slug: discoveryContext.slug
        }
      });
    };

    discoveryContext.before(function () {
      var defer = $q.defer();
      fetchContext().then(function (res) {
        var dc = angular.fromJson(res.body).payload.DiscoveryContext;

        for(var i in dc.results) {
          dc.results[i] = new Result(dc.results[i]);
        }

        angular.extend(discoveryContext, dc);
        
        defer.resolve(discoveryContext);
      });
      return defer.promise;
    });

    return this;

  };
});
