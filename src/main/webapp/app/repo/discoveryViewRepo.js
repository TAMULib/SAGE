sage.repo("DiscoveryViewRepo", function(DiscoveryView, WsApi) {
  var discoveryViewRepo = this;

  discoveryViewRepo.scaffold = new DiscoveryView({
    filter: "*:*"
  });

  discoveryViewRepo.getFields = function(discoveryView) {
    var fields = [];
    var getFieldsPromise = WsApi.fetch(discoveryViewRepo.mapping.getFields, {
      data: discoveryView
    });
    getFieldsPromise.then(function(response) {
      var apiRes = angular.fromJson(response.body);
      if(apiRes.meta.status === 'SUCCESS') {
        angular.extend(fields, apiRes.payload['ArrayList<SolrField>']);
      }
    });
    return fields;
  };

  return discoveryViewRepo;
});
