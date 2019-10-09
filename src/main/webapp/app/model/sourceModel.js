// This relates to a "Core", to represent a "Source", the readOnly property of a "Core" needs to be set to TRUE.
sage.model("Source", function($q, WsApi) {
  return function Source() {
    var model = this;

    model.testPing = function() {
      var promise = WsApi.fetch(model.getMapping().testPing, {
        data: model
      });
      return promise;
    };

    model.testLocation = function() {
      return $q(function(resolve) {
        resolve();
      });
    };

    model.testAuthorization = function() {
      return $q(function(resolve) {
        resolve();
      });
    };

    return model;
  };
});
