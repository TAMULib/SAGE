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
        uniqueIdentifierKey: "",
        dirty: function(boolean) {
          this.isDirty = boolean;
        }
    };

    repo.scaffoldSearchField = {
        key: "",
        label: "",
        dirty: function(boolean) {
          this.isDirty = boolean;
        }
    };

    repo.getScaffold = function() {
      return repo.scaffold;
    };

    return repo;
});
