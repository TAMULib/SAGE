var dataSearch1 = {
    id: 1
};

var dataSearch2 = {
    id: 2
};

var mockSearch3 = {
    id: 3
};

var dataSearch4 = {
    id: 4
};

var dataSearch5 = {
    id: 5
};

var mockSearch6 = {
    id: 6
};

var mockSearch = function($q) {
    var model = mockModel("Search", $q, dataSearch1);

    return model;
};

angular.module("mock.search", []).service("Search", mockSearch);
