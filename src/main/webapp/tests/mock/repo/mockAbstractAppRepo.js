var dataAbstractAppModelRepo1 = [
  dataAbstractAppModel1,
  dataAbstractAppModel2,
  dataAbstractAppModel3
];

var dataAbstractAppModelRepo2 = [
  dataAbstractAppModel3,
  dataAbstractAppModel2,
  dataAbstractAppModel1
];

var dataAbstractAppModelRepo3 = [
  dataAbstractAppModel1,
  dataAbstractAppModel3,
  dataAbstractAppModel2
];

angular.module("mock.abstractAppRepo", []).service("AbstractAppRepo", function ($q) {
  var repo = mockRepo("AbstractAppRepo", $q);

  return repo;
});
