var dataDiscoveryViewRepo1 = [
  dataDiscoveryView1,
  dataDiscoveryView2,
  dataDiscoveryView3
];

var dataDiscoveryViewRepo2 = [
  dataDiscoveryView3,
  dataDiscoveryView2,
  dataDiscoveryView1
];

var dataDiscoveryViewRepo3 = [
  dataDiscoveryView1,
  dataDiscoveryView3,
  dataDiscoveryView2
];

angular.module("mock.discoveryViewRepo", []).service("DiscoveryViewRepo", function($q) {
  var repo = mockRepo("DiscoveryViewRepo", $q, mockDiscoveryView, dataDiscoveryViewRepo1);

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
