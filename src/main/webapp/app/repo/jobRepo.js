sage.repo("JobRepo", function(Job, WsApi) {
  var jobRepo = this;

  jobRepo.scaffold = new Job({
    name: "Job",
    schedule: {
                active: false,
                scheduleData: {}
              }
  });

  jobRepo.run = function(job) {
    var runPromise = WsApi.fetch(jobRepo.mapping.run, {
      pathValues: {
        id: job.id
      }
    });
    return runPromise;
  };

  jobRepo.runAll = function() {
    var runAllPromise = WsApi.fetch(jobRepo.mapping.runAll);
    return runAllPromise;
  };

  return jobRepo;
});
