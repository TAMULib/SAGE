sage.repo("SourceRepo", function(Source, WsApi) {
  var sourceRepo = this;

  sourceRepo.scaffold = new Source({
    name: "Local Solr",
    uri: "http://localhost:8983/solr/collection1"
  });

  sourceRepo.getFields = function(uri, filter) {
    var fields = [];
    var getFieldsPromise = WsApi.fetch(sourceRepo.mapping.getFields, {
      query: {
        uri: uri,
        filter: filter
      }
    });
    getFieldsPromise.then(function(response) {
      var apiRes = angular.fromJson(response.body);
      if(apiRes.meta.status === 'SUCCESS') {
        angular.extend(fields, apiRes.payload['ArrayList<SolrField>']);
      }
    });
    return fields;
  };

  return sourceRepo;
});
