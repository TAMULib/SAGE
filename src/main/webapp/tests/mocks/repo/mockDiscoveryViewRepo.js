angular.module("mock.discoveryViewRepo", []).service("DiscoveryViewRepo", function($q, ) {
    var repo = mockRepo("DiscoveryViewRepo", $q);

    repo.scaffold = {
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

    repo.scaffoldSearchField = {
        key: "",
        label: ""
    };

    repo.getScaffold = function() {
      return repo.scaffold;
    };

    return repo;
});
