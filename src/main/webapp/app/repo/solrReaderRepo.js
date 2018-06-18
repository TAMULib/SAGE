sage.repo("SolrReaderRepo", function(SolrReader,WsApi) {
  var solrReaderRepo = this;

  solrReaderRepo.getMetadataFields = function(fields) {
    var fieldsPromise = WsApi.fetch(solrReaderRepo.mapping.getMetadataFields);
    fieldsPromise.then(function(res) {
      angular.extend(fields, angular.fromJson(res.body).payload['ArrayList<String>']);
    });
    return fieldsPromise;
};

  return solrReaderRepo;
});