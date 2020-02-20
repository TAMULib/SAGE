var dataResult1 = {
  id: 1,
  fields: [],
  inList: true,
  inGrid: false,
  title: "Result 1",
  resourceLocationUriKey: "resourceLocationUriKey",
  resourceThumbnailUriKey: "resourceThumbnailUriKey",
  uniqueIdentifier: "uniqueIdentifier"
};

var dataResult2 = {
  id: 2,
  fields: [],
  inList: true,
  inGrid: false,
  title: "Result 2",
  resourceLocationUriKey: "resourceLocationUriKey",
  resourceThumbnailUriKey: "resourceThumbnailUriKey",
  uniqueIdentifier: "uniqueIdentifier"
};

var dataResult3 = {
  id: 3,
  fields: [],
  inList: false,
  inGrid: false,
  title: "Result 3",
  resourceLocationUriKey: "resourceLocationUriKey",
  resourceThumbnailUriKey: "resourceThumbnailUriKey",
  uniqueIdentifier: "uniqueIdentifier"
};

var mockResult = function ($q) {
  var model = mockModel("Result", $q, dataResult1);

  return model;
};

angular.module("mock.result", []).service("Result", mockResult);
