var dataJobRepo1 = [
  dataJob1,
  dataJob2,
  dataJob3
];

var dataJobRepo2 = [
  dataJob3,
  dataJob2,
  dataJob1
];

var dataJobRepo3 = [
  dataJob1,
  dataJob3,
  dataJob2
];

angular.module("mock.jobRepo", []).service("JobRepo", function($q) {
  var repo = mockRepo("JobRepo", $q, mockJob, dataJobRepo1);

  repo.scaffold = {
    name: "Job",
    operators: [],
    readers: [],
    schedule: {
      active: false,
      scheduleData: {}
    },
    writers: []
  };

  return repo;
});
