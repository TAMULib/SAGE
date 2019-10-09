sage.repo("ReaderRepo", function(WsApi) {
  var repo = this;

  repo.scaffold = {
    fields: [],
    filter: "*:*",
    name: "",
    source: {}
  };

  return repo;
});
