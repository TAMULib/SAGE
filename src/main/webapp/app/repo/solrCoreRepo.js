sage.repo("SolrCoreRepo", function() {
  var solrCoreRepo = this;

  solrCoreRepo.scaffold = {
    name: "",
    uri: "http://www.example.com",
    username: "",
    password: ""
  };

  return solrCoreRepo;
});