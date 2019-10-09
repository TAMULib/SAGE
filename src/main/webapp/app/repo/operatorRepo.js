sage.repo("OperatorRepo", function(WsApi) {
  var repo = this;

  repo.scaffold = {
    name: "",
    type: "DEFAULT_OP",
    field: "",
    value: ""
  };

  repo.getTypes = function () {
    var types = [];
    var typesPromise = WsApi.fetch(repo.mapping.types);
    typesPromise.then(function (response) {
      var apiRes = angular.fromJson(response.body);
      if (apiRes.meta.status === 'SUCCESS') {
        angular.extend(types, apiRes.payload['ArrayList<OperatorType>']);
      }
    });
    return types;
  };

  return repo;
});
