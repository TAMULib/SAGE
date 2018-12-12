sage.model("DiscoveryContext", function ($q, HttpMethodVerbs, WsApi, Result, Field, Search) {
  return function DiscoveryContext() {

    var discoveryContext = this;

    var fetchContext = function () {

      console.log(discoveryContext.search.filters);
      return WsApi.fetch(discoveryContext.getMapping().load, {
        pathValues: {
          slug: discoveryContext.slug
        },
        query: {
          search: encodeURI(angular.toJson(discoveryContext.search.filters))
        }
      });
    };

    var populateProperty = function(pname, ctor) {
      for(var i in discoveryContext[pname]) {
        discoveryContext[pname][i] = new ctor(discoveryContext[pname][i]);
      }
    };

    discoveryContext.before(function () {

      discoveryContext.search = new Search({
        filters: [],
        query: ""
      });

      return discoveryContext.reload();
    });

    discoveryContext.reload = function() {
      var defer = $q.defer();
      fetchContext().then(function (res) {
        var dc = angular.fromJson(res.body).payload.DiscoveryContext;

        angular.extend(discoveryContext, dc);

        populateProperty("results", Result);

        populateProperty("fields", Field);

        defer.resolve(discoveryContext);
      });
      return defer.promise;
    };

    return this;

  };
});
