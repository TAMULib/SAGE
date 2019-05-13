angular.module('mock.validationStore', []).service('ValidationStore', function () {
  var validationStore = this;

  validationStore.getValidations = function(entityName) {
    return {};
  }

  return validationStore;
});
