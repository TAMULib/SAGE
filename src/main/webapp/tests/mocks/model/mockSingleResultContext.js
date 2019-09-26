var dataSingleResultContext1 = {
    id: 1,
    fields: [],
    inList: true,
    inGrid: false,
    title: "Result 1",
    resourceLocationUriKey: "resourceLocationUriKey",
    resourceThumbnailUriKey: "resourceThumbnailUriKey",
    uniqueIdentifier: "uniqueIdentifier"
};

var dataSingleResultContext2 = {
    id: 2,
    fields: [],
    inList: true,
    inGrid: false,
    title: "Result 2",
    resourceLocationUriKey: "resourceLocationUriKey",
    resourceThumbnailUriKey: "resourceThumbnailUriKey",
    uniqueIdentifier: "uniqueIdentifier"
};

var mockSingleResultContext3 = {
    id: 3,
    fields: [],
    inList: false,
    inGrid: false,
    title: "Result 3",
    resourceLocationUriKey: "resourceLocationUriKey",
    resourceThumbnailUriKey: "resourceThumbnailUriKey",
    uniqueIdentifier: "uniqueIdentifier"
};

var dataSingleResultContext4 = {
    id: 4,
    fields: [],
    inList: false,
    inGrid: true,
    title: "Result 4",
    resourceLocationUriKey: "resourceLocationUriKey",
    resourceThumbnailUriKey: "resourceThumbnailUriKey",
    uniqueIdentifier: "uniqueIdentifier"
};

var dataSingleResultContext5 = {
    id: 5,
    fields: [],
    inList: true,
    inGrid: true,
    title: "Result 5",
    resourceLocationUriKey: "resourceLocationUriKey",
    resourceThumbnailUriKey: "resourceThumbnailUriKey",
    uniqueIdentifier: "uniqueIdentifier"
};

var mockSingleResultContext6 = {
    id: 6,
    fields: [],
    inList: false,
    inGrid: false,
    title: "Result 6",
    resourceLocationUriKey: "resourceLocationUriKey",
    resourceThumbnailUriKey: "resourceThumbnailUriKey",
    uniqueIdentifier: "uniqueIdentifier"
};

var mockSingleResultContext = function($q) {
    var model = mockModel("SingleResultContext", $q, dataSingleResultContext1);

    return model;
};

angular.module("mock.singleResultContext", []).service("SingleResultContext", mockSingleResultContext);
