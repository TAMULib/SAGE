sage.repo("SourceRepo", function(Source) {
  var sourceRepo = this;

  sourceRepo.scaffold = new Source({
    name: "Local Solr",
    uri: "http://localhost:8983/solr/collection1"
  });

  return sourceRepo;
});
