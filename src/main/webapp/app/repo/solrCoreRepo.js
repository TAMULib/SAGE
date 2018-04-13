sage.repo("SolrCoreRepo", function(SolrCore) {
  var solrCoreRepo = this;

  solrCoreRepo.scaffold = new SolrCore({
    name: "Local Fedora",
    uri: "http://savell.evans.tamu.edu:8080/solr/collection1"
  });

  return solrCoreRepo;
});