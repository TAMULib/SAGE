sage.repo("DiscoveryViewRepo", function() {
  var discoveryViewRepo = this;

  discoveryViewRepo.scaffold = {
    name: "",
    source: "",
    facetFields: [],
    filter: "*:*",
    resourceLocationUriKey: "",
    resourceThumbnailUriKey: "",
    resultMetadataFields: [],
    searchFields: [ {
      key: "all_fields",
      label: "Everything"
    }],
    slug: "",
    titleKey: "",
    infoLinkText: "",
    infoLinkUrl: "",
    infoText: "",
    uniqueIdentifierKey: ""
  };

  discoveryViewRepo.scaffoldSearchField = {
    key: "",
    label: ""
  };

  return discoveryViewRepo;
});
