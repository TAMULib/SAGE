var dataOperatorRepo1 = [
  dataOperator1,
  dataOperator2,
  dataOperator3
];

var dataOperatorRepo2 = [
  dataOperator3,
  dataOperator2,
  dataOperator1
];

var dataOperatorRepo3 = [
  dataOperator1,
  dataOperator3,
  dataOperator2
];

angular.module("mock.operatorRepo", []).service("OperatorRepo", function($q) {
  var repo = mockRepo("OperatorRepo", $q, mockOperator, dataOperatorRepo1);

  repo.scaffold = {
    name: "",
    type: "DEFAULT_OP",
    field: "",
    value: ""
  };

  repo.getTypes = function () {
    return [
      {
        name: 'DEFAULT_OP',
        entity: 'DefaultOp'
      },
      {
        name: 'CONSTANT_OP',
        entity: 'ConstantOp'
      }
    ];
  };

  return repo;
});
