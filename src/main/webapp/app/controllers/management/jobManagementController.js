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

  $scope.weekDays = {1:"Monday",2:"Tuesday",3:"Wednesday",4:"Thursday",5:"Friday",6:"Saturday",7:"Sunday"};
  $scope.months = {1:"January",2:"February",3:"March",4:"April",5:"May",6:"June",7:"July",8:"August",9:"September",10:"October",11:"November",12:"December"};

  $scope.popupStart = {
    opened: false
  };

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
    var now = new Date();
    $scope.jobToCreate.schedule.scheduleData.startTime = new Date(now.getFullYear()+"-"+now.getMonth()+"-"+now.getDay()+"T"+"12:00:00Z");
    $scope.openModal("#createJobModal");
  };

  $scope.createJob = function() {
    JobRepo.create($scope.jobToCreate).then(function(res) {
      if (angular.fromJson(res.body).meta.status === "SUCCESS") {
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
    $scope.jobToUpdate.schedule.scheduleData.date = new Date($scope.jobToUpdate.schedule.scheduleData.date);
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

  $scope.showScheduleOption = function(activeModel, type) {
    if ($scope[activeModel] != null && $scope[activeModel].schedule !== undefined) {
      if (type == "days") {
        return ($scope[activeModel].schedule.frequency == 'HOURLY' || $scope[activeModel].schedule.frequency == 'DAILY' || $scope[activeModel].schedule.frequency == 'WEEKLY');
      } else if (type == 'date') {
        return ($scope[activeModel].schedule.frequency == 'ONCE');
      } else if (type == "time") {
        return ($scope[activeModel].schedule.frequency == 'ONCE' || $scope[activeModel].schedule.frequency == 'MONTHLY' || $scope[activeModel].schedule.frequency == 'DAILY'  || $scope[activeModel].schedule.frequency == 'WEEKLY');
      } else if (type == "month") {
        return ($scope[activeModel].schedule.frequency == 'MONTHLY');
      } else if (type == "ondemand") {
        return ($scope[activeModel].schedule.frequency == 'ONDEMAND');
      }
    }

    return false;
  };

  var prepDays = function(days) {
    var activeDays = [];
    if (days !== undefined) {
      activeDays = days.split(",");
    }
    return activeDays;
  };

  $scope.toggleDay = function(activeModel, day) {
    var activeDays = prepDays($scope[activeModel].schedule.scheduleData.days);
    if ($scope.hasDay(activeModel, day)) {
      activeDays.splice(activeDays.indexOf(day),1);
    } else {
      activeDays.push(day);
    }
    $scope[activeModel].schedule.scheduleData.days = activeDays.toString();
  };

  $scope.hasDay = function(activeModel, day) {
    var foundDay = false;
    var activeDays = prepDays($scope[activeModel].schedule.scheduleData.days);
    if (activeDays.indexOf(day.toString()) > -1) {
      foundDay = true;
    }
    return foundDay;
  };

  var prepMonths = function(months) {
    var activeMonths = [];
    if (months !== undefined) {
      activeMonths = months.split(",");
    }
    return activeMonths;
  };

  $scope.toggleMonth = function(activeModel, month) {
    var activeMonths = prepMonths($scope[activeModel].schedule.scheduleData.months);
    if ($scope.hasMonth(activeModel, month)) {
      activeMonths.splice(activeMonths.indexOf(month),1);
    } else {
      activeMonths.push(month);
    }
    $scope[activeModel].schedule.scheduleData.months = activeMonths.toString();
  };

  $scope.hasMonth = function(activeModel, month) {
    var foundMonth = false;
    var activeMonths = prepMonths($scope[activeModel].schedule.scheduleData.months);
    if (activeMonths.indexOf(month.toString()) > -1) {
      foundMonth = true;
    }
    return foundMonth;
  };

  $scope.clearExistingSchedule = function() {
    $scope.jobToUpdate.schedule.scheduleData = {};
  };

  $scope.openStart = function ($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.popupStart.opened = true;
  };

  $scope.openEnd = function ($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.popupEnd.opened = true;
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
