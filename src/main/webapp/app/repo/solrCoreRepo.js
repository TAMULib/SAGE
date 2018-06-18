sage.repo("SolrCoreRepo", function(SolrCore) {
  var solrCoreRepo = this;

  solrCoreRepo.scaffold = new SolrCore({
    name: "Local Fedora",
    uri: "http://localhost:8983/solr/collection1"
  });

  return solrCoreRepo;
});