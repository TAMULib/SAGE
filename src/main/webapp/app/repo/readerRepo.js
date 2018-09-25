sage.repo("ReaderRepo", function(Reader, WsApi) {
  var readerRepo = this;

  readerRepo.getMetadataFields = function(fields) {
    var fieldsPromise = WsApi.fetch(readerRepo.mapping.getMetadataFields);
    fieldsPromise.then(function(res) {
      angular.extend(fields, angular.fromJson(res.body).payload['ArrayList<String>']);
    });
    return fieldsPromise;
  };

  return readerRepo;
});
