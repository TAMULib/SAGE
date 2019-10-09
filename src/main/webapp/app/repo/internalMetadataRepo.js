sage.repo("InternalMetadataRepo", function() {
  var internalMetadataRepo = this;

  internalMetadataRepo.scaffold = {
    gloss: "",
    field: "",
    required: true
  };

  return internalMetadataRepo;
});
