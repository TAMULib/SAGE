var dataSearchField1 = {
    id: 1,
    key: "search_field_1",
    label: "Search Field 1"
};

var dataSearchField2 = {
    id: 2,
    key: "search_field_2",
    label: "Search Field 2"
};

var mockSearchField3 = {
    id: 3,
    key: "search_field_3",
    label: "Search Field 3"
};

var dataSearchField4 = {
    id: 4,
    key: "search_field_4",
    label: "Search Field 4"
};

var dataSearchField5 = {
    id: 5,
    key: "search_field_5",
    label: "Search Field 5"
};

var mockSearchField6 = {
    id: 6,
    key: "search_field_6",
    label: "Search Field 6"
};

var mockSearchField = function($q) {
    var model = mockModel("SearchField", $q, dataSearchField1);

    return model;
};

angular.module("mock.searchField", []).service("SearchField", mockSearchField);
