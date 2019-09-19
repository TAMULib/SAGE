sage.repo("DiscoveryViewRepo", function(DiscoveryView, SearchField) {
  var discoveryViewRepo = this;

  discoveryViewRepo.scaffold = new DiscoveryView({
    name: "",
    source: "",
    facetFields: [],
    filter: "*:*",
    resourceLocationUriKey: "",
    resourceThumbnailUriKey: "",
    resultMetadataFields: [],
    searchFields: [ new SearchField({
      key: "all_fields",
      label: "Everything"
    })],
    slug: "",
    titleKey: "",
    infoLinkText: "",
    infoLinkUrl: "",
    infoText: "",
    uniqueIdentifierKey: ""
  });

  discoveryViewRepo.scaffoldSearchField = new SearchField({
    key: "",
    label: ""
  });

  return discoveryViewRepo;
});
