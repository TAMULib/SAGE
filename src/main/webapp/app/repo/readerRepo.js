sage.repo("ReaderRepo", function(WsApi) {
  var readerRepo = this;

  readerRepo.scaffold = {
    fields: [],
    filter: "*:*",
    name: ""
  };

  return readerRepo;
});
