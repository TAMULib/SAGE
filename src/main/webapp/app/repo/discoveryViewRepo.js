sage.repo("DiscoveryViewRepo", function(DiscoveryView) {
  var discoveryViewRepo = this;

  discoveryViewRepo.scaffold = new DiscoveryView({
    name: "",
    source: "",
    facetFields: [],
    filter: "*:*",
    resourceLocationUriKey: "",
    resourceThumbnailUriKey: "",
    resultMetadataFields: [],
    slug: "",
    titleKey: "",
    infoLinkText: "",
    infoLinkUrl: "",
    infoText: "",
    uniqueIdentifierKey: ""
  });

  return discoveryViewRepo;
});
