sage.repo("JobRepo", function(Job, WsApi) {
  var jobRepo = this;

  jobRepo.scaffold = new Job({
    name: "Job"
  });

  return jobRepo;
});
