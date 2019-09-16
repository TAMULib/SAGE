sage.repo("DiscoveryViewRepo", function(DiscoveryView) {
  var discoveryViewRepo = this;

  discoveryViewRepo.scaffold = new DiscoveryView({
    name: "",
    source: "",
    filter: "*:*",
    resourceLocationUriKey: "",
    resourceThumbnailUriKey: "",
    slug: "",
    titleKey: "",
    infoLinkText: "",
    infoLinkUrl: "",
    infoText: "",
    uniqueIdentifierKey: ""
  });

  return discoveryViewRepo;
});
