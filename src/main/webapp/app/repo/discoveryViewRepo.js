sage.repo("DiscoveryViewRepo", function() {
  var discoveryViewRepo = this;

  discoveryViewRepo.scaffold = {
    ascending: true,
    name: "",
    source: "",
    facetFields: [],
    filter: "",
    resourceLocationUriKey: "",
    resourceThumbnailUriKey: "",
    manifestUriKey: "",
    resultMetadataFields: [],
    searchFields: [],
    slug: "",
    titleKey: "",
    infoLinkText: "",
    infoLinkUrl: "",
    infoText: "",
    queryParser: "",
    defaultOperand: "",
    uniqueIdentifierKey: ""
  };

  discoveryViewRepo.scaffoldFacetField = {
    key: "",
    label: "",
    type: "",
    widget: ""
  };

  discoveryViewRepo.scaffoldSearchField = {
    key: "",
    label: ""
  };

  discoveryViewRepo.scaffoldMetadataField = {
    inGrid: true,
    inList: true,
    inSingleResult: true,
    key: "",
    label: "",
    sortable: true,
    type: ""
  };

  return discoveryViewRepo;
});
