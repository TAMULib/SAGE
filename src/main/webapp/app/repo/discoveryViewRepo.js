sage.repo("DiscoveryViewRepo", function(DiscoveryView) {
  var DiscoveryViewRepo = this;

  DiscoveryViewRepo.scaffold = new DiscoveryView({
    filter: "*:*"
  });

  return DiscoveryViewRepo;
});
