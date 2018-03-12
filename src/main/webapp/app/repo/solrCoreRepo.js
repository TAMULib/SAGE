sage.repo("SolrCoreRepo", function(SolrCore) {
  var solrCoreRepo = this;

  solrCoreRepo.scaffold = new SolrCore({
    name: "",
    uri: "http://www.example.com",
    username: "",
    password: ""
  });

  return solrCoreRepo;
});