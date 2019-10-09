sage.repo("JobRepo", function(Job, WsApi) {
  var repo = this;

  repo.scaffold = new Job({
    name: "Job",
    operators: [],
    readers: [],
    schedule: {
      active: false,
      scheduleData: {}
    },
    writers: []
  });

  repo.run = function(job) {
    var runPromise = WsApi.fetch(repo.mapping.run, {
      pathValues: {
        id: job.id
      }
    });
    return runPromise;
  };

  repo.runAll = function() {
    var runAllPromise = WsApi.fetch(repo.mapping.runAll);
    return runAllPromise;
  };

  return repo;
});
