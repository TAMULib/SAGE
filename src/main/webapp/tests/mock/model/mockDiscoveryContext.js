var dataDiscoveryContext1 = {
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
  search: {
    field: "all_fields",
    value: "",
    filters: [],
    start: 0,
    total: 0,
    page: {
      number: 0,
      size: 10,
      sort: "id",
      offset: 0
    }
  },
  searchFields: [],
  slug: "slug",
  source: "source",
  titleKey: "titleKey",
  uniqueIdentifierKey: "uniqueIdentifierKey"
};

var dataDiscoveryContext2 = {
  id: 2,
  defaultOperand: "AND",
  facetFields: [],
  filter: "filter",
  infoLinkText: "infoLinkText",
  infoLinkUrl: "http://example.com/",
  infoText: "infoText",
  name: "Discovery View 2",
  queryParser: "dismax",
  resourceThumbnailUriKey: "resourceThumbnailUriKey",
  resourceLocationUriKey: "resourceLocationUriKey",
  resultMetadataFields: [],
  search: {
    field: "",
    value: "",
    filters: [],
    start: 0,
    total: 0,
    page: {
      number: 0,
      size: 10,
      sort: "id",
      offset: 0
    }
  },
  searchFields: [],
  slug: "slug",
  source: "source",
  titleKey: "titleKey",
  uniqueIdentifierKey: "uniqueIdentifierKey"
};

var dataDiscoveryContext3 = {
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
  search: {
    field: "",
    value: "",
    filters: [],
    start: 0,
    total: 0,
    page: {
      number: 0,
      size: 10,
      sort: "",
      offset: 0
    }
  },
  searchFields: [],
  slug: "slug",
  source: "source",
  titleKey: "titleKey",
  uniqueIdentifierKey: "uniqueIdentifierKey"
};

var mockDiscoveryContext = function ($q) {
  var model = mockModel("DiscoveryContext", $q, dataDiscoveryContext1);

  model.mockRouteParams = {};
  model.mockSearching = false;

  model.addFilter = function (label, key, value) {
    var filter = {
      label: label,
      key: key,
      value: value
    };

    if (!model.search.filters) {
      model.search.filters = [];
    }

    model.search.filters.push(filter);
    return model.executeSearch();
  };

  model.buildPage = function () {
    var page = {
      number: 0,
      size: 10,
      sort: "id",
      offset: 0
    };

    return page;
  };

  model.executeSearch = function (maintainPage) {
    return $q(function (resolve) {
      resolve();
    });
  };

  model.isSearching = function () {
    return model.mockSearching;
  };

  model.removeFilter = function (filter) {
    for (var i = 0; i < model.search.filters.length; i++) {
      var f = model.search.filters[i];
      if (f.key === filter.key && f.value === filter.value) {
        model.search.filters.splice(i, 1);
      }
    }
    return model.executeSearch();
  };

  model.resetPage = function () {
    model.search.filters.length = 0;
    model.search.field = "";
    model.search.value = "";
    model.search.label = "";
    return model.executeSearch();
  };

  model.resetSearch = function () {
    model.search.field = "";
    model.search.value = "";
    model.search.label = "";
    return model.executeSearch();
  };

  model.setSearchField = function (key, value) {
    model.search.field = key;
    model.search.value = value;
  };

  model.getBreadcrumb = function () {
    return {
      label: model.name,
      path: "discovery-context/" + model.slug
    };
  };

  return model;
};

angular.module("mock.discoveryContext", []).service("DiscoveryContext", mockDiscoveryContext);
