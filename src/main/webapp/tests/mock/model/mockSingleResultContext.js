var dataSingleResultContext1 = {
  id: 1,
  fields: [],
  inList: true,
  inGrid: false,
  title: '["Result 1"]',
  resourceLocationUriKey: "resourceLocationUriKey",
  resourceThumbnailUriKey: "resourceThumbnailUriKey",
  uniqueIdentifier: "uniqueIdentifier"
};

var dataSingleResultContext2 = {
  id: 2,
  fields: [],
  inList: true,
  inGrid: false,
  title: '["Result 2"]',
  resourceLocationUriKey: "resourceLocationUriKey",
  resourceThumbnailUriKey: "resourceThumbnailUriKey",
  uniqueIdentifier: "uniqueIdentifier"
};

var dataSingleResultContext3 = {
  id: 3,
  fields: [],
  inList: false,
  inGrid: false,
  title: '["Result 3"]',
  resourceLocationUriKey: "resourceLocationUriKey",
  resourceThumbnailUriKey: "resourceThumbnailUriKey",
  uniqueIdentifier: "uniqueIdentifier"
};

var mockSingleResultContext = function ($q) {
  var model = mockModel("SingleResultContext", $q, dataSingleResultContext1);

  model.getBreadcrumb = function () {
    return {
      label: model.title,
      path: "discovery-context/" + model.slug + "/" + model.resultId
    };
  };

  return model;
};

angular.module("mock.singleResultContext", []).service("SingleResultContext", mockSingleResultContext);
