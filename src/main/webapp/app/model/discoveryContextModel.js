sage.model("DiscoveryContext", function ($q, HttpMethodVerbs, WsApi) {
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
        angular.extend(discoveryContext, angular.fromJson(res.body).payload.DiscoveryContext);
        defer.resolve(discoveryContext);
      });
      return defer.promise;
    });

    return this;

  };
});
