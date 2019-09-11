sage.repo("WriterRepo", function(Writer, WsApi) {
  var writerRepo = this;

  writerRepo.scaffold = {
    name: ""
  };

  return writerRepo;
});
