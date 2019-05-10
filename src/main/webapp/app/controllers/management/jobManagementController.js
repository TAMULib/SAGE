sage.controller('JobManagementController', function ($controller, $scope, NgTableParams, JobRepo, OperatorRepo, ReaderRepo, WriterRepo) {

  angular.extend(this, $controller('AbstractController', {
      $scope: $scope
  }));

  $scope.jobs = JobRepo.getAll();
  $scope.operators = OperatorRepo.getAll();
  $scope.readers = ReaderRepo.getAll();
  $scope.writers = WriterRepo.getAll();

  $scope.jobToCreate = JobRepo.getScaffold();
  $scope.jobToUpdate = {};
  $scope.jobToDelete = {};

  $scope.jobForms = {
    validations: JobRepo.getValidations(),
    getResults: JobRepo.getValidationResults
  };

  $scope.resetJobForms = function() {
    JobRepo.clearValidationResults();
    for (var key in $scope.jobForms) {
      if ($scope.jobForms[key] !== undefined && !$scope.jobForms[key].$pristine && $scope.jobForms[key].$setPristine) {
        $scope.jobForms[key].$setPristine();
      }
    }
    $scope.closeModal();
  };

  $scope.startCreateJob = function() {
    $scope.openModal("#createJobModal");
  };

  $scope.createJob = function() {
    JobRepo.create($scope.jobToCreate).then(function(res) {
      if(angular.fromJson(res.body).meta.status === "SUCCESS") {
        $scope.cancelCreateJob();
      }
    });
  };

  $scope.cancelCreateJob = function() {
    angular.extend($scope.jobToCreate, JobRepo.getScaffold());
    $scope.newJobFields = {};
    $scope.resetJobForms();
  };

  $scope.runJob = function(job) {
    JobRepo.run(job);
  };

  $scope.runAllJobs = function() {
    JobRepo.runAll();
  };

  $scope.updateJob = function() {
    $scope.updatingJob = true;
    $scope.jobToUpdate.dirty(true);
    $scope.jobToUpdate.save().then(function() {
      $scope.resetJobForms();
      $scope.updatingJob = false;
    });
  };

  $scope.startUpdateJob = function(job) {
    $scope.jobToUpdate = angular.copy(job);
    $scope.openModal("#updateJobModal");
  };

  $scope.cancelUpdateJob = function(job) {
    $scope.jobToUpdate = {};
    $scope.resetJobForms();
  };

  $scope.confirmDeleteJob = function(job) {
    $scope.jobToDelete = angular.copy(job);
    $scope.openModal("#confirmDeleteJobModal");
  };

  $scope.cancelDeleteJob = function(job) {
    $scope.jobToDelete = {};
    $scope.resetJobForms();
  };

  $scope.deleteJob = function() {
    $scope.deletingJob = true;
    JobRepo.delete($scope.jobToDelete).then(function() {
      $scope.deletingJob = false;
      $scope.resetJobForms();
    });
  };

  JobRepo.ready().then(function() {
    $scope.setTable = function() {
      $scope.tableParams = new NgTableParams({
        count: $scope.jobs.length,
        sorting: {name: 'desc'}
      }, {
        counts: [],
        total: 0,
        getData: function(params) {
          return $scope.jobs;
        }
      });
    };
    $scope.setTable();
  });

});
