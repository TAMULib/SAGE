sage.repo("DiscoveryViewRepo", function() {
  var repo = this;

  repo.scaffold = {
    name: "",
    source: "",
    facetFields: [],
    filter: "",
    resourceLocationUriKey: "",
    resourceThumbnailUriKey: "",
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

  repo.scaffoldFacetField = {
    key: "",
    label: "",
    type: "",
    widget: ""
  };

  repo.scaffoldSearchField = {
    key: "",
    label: ""
  };

  repo.scaffoldMetadataField = {
    inGrid: true,
    inList: true,
    inSingleResult: true,
    key: "",
    label: "",
    sortable: true,
    type: ""
  };

  return repo;
});
