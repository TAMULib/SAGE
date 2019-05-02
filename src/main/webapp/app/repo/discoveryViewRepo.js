sage.repo("DiscoveryViewRepo", function(DiscoveryView) {
  var discoveryViewRepo = this;

  discoveryViewRepo.scaffold = new DiscoveryView({
    name: "",
    filter: "*:*",
    slug: "",
    infoLinkText: "",
    infoLinkUrl: "",
    infoText: ""
  });

  return discoveryViewRepo;
});
