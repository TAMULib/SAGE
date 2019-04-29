sage.repo("SourceRepo", function(Source, WsApi) {
  var sourceRepo = this;

  sourceRepo.scaffold = new Source({
    name: "Local Solr",
    uri: "http://localhost:8983/solr/collection1",
    readOnly: true
  });

  sourceRepo.getReadable = function() {
    var readableSources = [];
    var readablePromise = WsApi.fetch(sourceRepo.mapping.readable);
    readablePromise.then(function(res) {
      angular.extend(readableSources, angular.fromJson(res.body).payload['ArrayList<Source>']);
    });
    return readableSources;
  };

  sourceRepo.getWriteable = function() {
    var writeableSources = [];
    var writeablePromise = WsApi.fetch(sourceRepo.mapping.writeable);
    writeablePromise.then(function(res) {
      angular.extend(writeableSources, angular.fromJson(res.body).payload['ArrayList<Source>']);
    });
    return writeableSources;
  };

  return sourceRepo;
});
