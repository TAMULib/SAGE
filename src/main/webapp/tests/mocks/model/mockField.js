var dataField1 = {
    id: 1,
    name: "Field 1",
    schemaMapping: "schemaMapping"
};

var dataField2 = {
    id: 2,
    name: "Field 2",
    schemaMapping: "schemaMapping"
};

var mockField3 = {
    id: 3,
    name: "Field 3",
    schemaMapping: "schemaMapping"
};

var dataField4 = {
    id: 4,
    name: "Field 4",
    schemaMapping: "schemaMapping"
};

var dataField5 = {
    id: 5,
    name: "Field 5",
    schemaMapping: "schemaMapping"
};

var mockField6 = {
    id: 6,
    name: "Field 6",
    schemaMapping: "schemaMapping"
};

var mockField = function($q) {
    var model = mockModel("Field", $q, dataField1);

    return model;
};

angular.module("mock.field", []).service("Field", mockField);
