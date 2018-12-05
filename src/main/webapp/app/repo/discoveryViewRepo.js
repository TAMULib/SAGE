sage.repo("DiscoveryViewRepo", function(DiscoveryView) {
  var DiscoveryViewRepo = this;

  DiscoveryViewRepo.scaffold = new DiscoveryView({});

  return DiscoveryViewRepo;
});
