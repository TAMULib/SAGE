sage.repo("InternalMetadataRepo", function() {
  var repo = this;

  repo.scaffold = {
    gloss: "",
    field: "",
    required: true
  };

  return repo;
});
