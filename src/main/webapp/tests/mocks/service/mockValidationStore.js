angular.module("mock.validationStore", []).service("ValidationStore", function ($q) {
  var service = mockService($q);

  service.getValidations = function(entityName) {
    return {};
  };

  return service;
});
