// This relates to a "Core", to represent a "Source", the readOnly property of a "Core" needs to be set to TRUE.
sage.model("Source", function($q, WsApi) {
  return function Source() {
    var source = this;

    source.testPing = function() {
      var promise = WsApi.fetch(source.getMapping().testPing, {
        data: source
      });
      return promise;
    };

    source.testLocation = function() {
      return $q(function(resolve) {
        resolve();
      });
    };

    source.testAuthorization = function() {
      return $q(function(resolve) {
        resolve();
      });
    };

    return source;
  };
});
