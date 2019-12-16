var dataDiscoveryView1 = {
  id: 1,
  defaultOperand: "",
  facetFields: [],
  filter: "filter",
  infoLinkText: "infoLinkText",
  infoLinkUrl: "http://example.com/",
  infoText: "infoText",
  name: "Discovery View 1",
  queryParser: "",
  resourceThumbnailUriKey: "resourceThumbnailUriKey",
  resourceLocationUriKey: "resourceLocationUriKey",
  resultMetadataFields: [],
  searchFields: [],
  slug: "slug",
  source: "source",
  titleKey: "titleKey",
  uniqueIdentifierKey: "uniqueIdentifierKey"
};

var dataDiscoveryView2 = {
  id: 2,
  defaultOperand: "AND",
  filter: "filter",
  infoLinkText: "infoLinkText",
  infoLinkUrl: "http://example.com/",
  infoText: "infoText",
  name: "Discovery View 2",
  queryParser: "dismax",
  resourceThumbnailUriKey: "resourceThumbnailUriKey",
  resourceLocationUriKey: "resourceLocationUriKey",
  resultMetadataFields: [],
  searchFields: [],
  slug: "slug",
  source: "source",
  titleKey: "titleKey",
  uniqueIdentifierKey: "uniqueIdentifierKey"
};

var dataDiscoveryView3 = {
  id: 3,
  defaultOperand: "OR",
  facetFields: [],
  filter: "filter",
  infoLinkText: "infoLinkText",
  infoLinkUrl: "http://example.com/",
  infoText: "infoText",
  name: "Discovery View 3",
  queryParser: "edismax",
  resourceThumbnailUriKey: "resourceThumbnailUriKey",
  resourceLocationUriKey: "resourceLocationUriKey",
  resultMetadataFields: [],
  searchFields: [],
  slug: "slug",
  source: "source",
  titleKey: "titleKey",
  uniqueIdentifierKey: "uniqueIdentifierKey"
};

var mockDiscoveryView = function($q) {
  var model = mockModel("DiscoveryView", $q, dataDiscoveryView1);

  return model;
};

angular.module("mock.discoveryView", []).service("DiscoveryView", mockDiscoveryView);
