sage.repo("OperatorRepo", function(WsApi) {
  var operatorRepo = this;

  operatorRepo.scaffold = {
    name: "",
    type: "DEFAULT_OP",
    field: "",
    value: ""
  };

  operatorRepo.getTypes = function () {
    var types = [];
    var typesPromise = WsApi.fetch(operatorRepo.mapping.types);
    typesPromise.then(function (response) {
      var apiRes = angular.fromJson(response.body);
      if (apiRes.meta.status === 'SUCCESS') {
        angular.extend(types, apiRes.payload['ArrayList<OperatorType>']);
      }
    });
    return types;
  };

  return operatorRepo;
});
