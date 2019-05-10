sage.repo("ReaderRepo", function(WsApi) {
  var readerRepo = this;

  readerRepo.scaffold = {
    filter: "*:*"
  };

  return readerRepo;
});
