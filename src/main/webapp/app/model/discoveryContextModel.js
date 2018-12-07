sage.model("DiscoveryContext", function ($q, HttpMethodVerbs, WsApi) {
  return function DiscoveryContext() {

    var discoveryContext = this;

    var fetchContext = function () {
      console.log(discoveryContext.getMapping().load);
      return WsApi.fetch(discoveryContext.getMapping().load, {
        method: HttpMethodVerbs.GET,
        pathValues: {
          slug: discoveryContext.slug
        }
      });
    };

    discoveryContext.before(function () {
      var defer = $q.defer();
      console.log(discoveryContext.slug);
      fetchContext().then(function (res) {
        console.log(angular.fromJson(res.body));
        angular.extend(discoveryContext, angular.fromJson(res.body).payload.DiscoveryView);
        defer.resolve(discoveryContext);
      });
      return defer.promise;
    });

    return this;

  };
});
