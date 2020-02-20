describe("controller: JobManagementController", function () {
  var $q, $scope, JobRepo, MockedJob, MockedOperator, MockedReader, MockedSource, MockedUser, MockedWriter, controller, event;

  var initializeVariables = function () {
    inject(function (_$q_, _JobRepo_) {
      $q = _$q_;

      // @todo: create a mock event object with appropriate methods.
      event = {
        preventDefault: function () {},
        stopPropagation: function () {}
      };

      JobRepo = _JobRepo_;
      MockedJob = new mockJob($q);
      MockedOperator = new mockOperator($q);
      MockedReader = new mockReader($q);
      MockedSource = new mockSource($q);
      MockedUser = new mockUser($q);
      MockedWriter = new mockWriter($q);
    });
  };

  var initializeController = function (settings) {
    inject(function (_$controller_, _$rootScope_, _Job_, _Reader_, _ReaderRepo_, _OperatorRepo_, _Source_, _SourceRepo_, _User_, _UserService_, _Writer_, _WriterRepo_) {
      $scope = _$rootScope_.$new();

      sessionStorage.role = settings && settings.role ? settings.role : "ROLE_ADMIN";
      sessionStorage.token = settings && settings.token ? settings.token : "faketoken";

      controller = _$controller_("JobManagementController", {
        $scope: $scope,
        Job: _Job_,
        JobRepo: JobRepo,
        Reader: _Reader_,
        ReaderRepo: _ReaderRepo_,
        Source: _Source_,
        SourceRepo: _SourceRepo_,
        User: _User_,
        UserService: _UserService_,
        Writer: _Writer_,
        WriterRepo: _WriterRepo_,
        OperatorRepo: _OperatorRepo_
      });

      // ensure that the isReady() is called.
      if (!$scope.$$phase) {
        $scope.$digest();
      }
    });
  };

  beforeEach(function () {
    module("core");
    module("sage");
    module("mock.job", function ($provide) {
      var Job = function () {
        return MockedJob;
      };
      $provide.value("Job", Job);
    });
    module("mock.jobRepo");
    module("mock.operator", function ($provide) {
      var Operator = function () {
        return MockedOperator;
      };
      $provide.value("Operator", Operator);
    });
    module("mock.operatorRepo");
    module("mock.reader", function ($provide) {
      var Reader = function () {
        return MockedReader;
      };
      $provide.value("Reader", Reader);
    });
    module("mock.readerRepo");
    module("mock.source", function ($provide) {
      var Source = function () {
        return MockedSource;
      };
      $provide.value("Source", Source);
    });
    module("mock.sourceRepo");
    module("mock.user", function ($provide) {
      var User = function () {
        return MockedUser;
      };
      $provide.value("User", User);
    });
    module("mock.userService");
    module("mock.writer", function ($provide) {
      var Writer = function () {
        return MockedWriter;
      };
      $provide.value("Writer", Writer);
    });
    module("mock.writerRepo");
    module("mock.wsApi");

    installPromiseMatchers();
    initializeVariables();
    initializeController();
  });

  describe("Is the controller", function () {
    var roles = [ "ROLE_ADMIN", "ROLE_MANAGER", "ROLE_USER", "ROLE_ANONYMOUS" ];

    var controllerExists = function (setting) {
      return function() {
        initializeController(setting);
        expect(controller).toBeDefined();
      };
    };

    for (var i in roles) {
      it("defined for " + roles[i], controllerExists({ role: roles[i] }));
    }
  });

  describe("Is the scope method", function () {
    var methods = [
      "cancelCreateJob",
      "cancelDeleteJob",
      "cancelUpdateJob",
      "clearExistingSchedule",
      "confirmDeleteJob",
      "createJob",
      "deleteJob",
      "hasDay",
      "hasMonth",
      "openEnd",
      "openStart",
      "resetJobForms",
      "setTable",
      "showScheduleOption",
      "startCreateJob",
      "startUpdateJob",
      "toggleDay",
      "toggleMonth",
      "updateJob"
    ];

    var scopeMethodExists = function (method) {
      return function() {
        expect($scope[method]).toBeDefined();
        expect(typeof $scope[method]).toEqual("function");
      };
    };

    for (var i in methods) {
      it(methods[i] + " defined", scopeMethodExists(methods[i]));
    }
  });

  describe("Are the $scope methods working as expected", function () {
    it("cancelCreateJob should cancel creating a job", function () {
      spyOn($scope, "resetJobForms");

      $scope.cancelCreateJob();

      expect(typeof $scope.jobToCreate).toEqual("object");
      expect($scope.resetJobForms).toHaveBeenCalled();
    });

    it("cancelDeleteJob should cancel deleting a job", function () {
      var job = new mockJob($q);
      $scope.jobToDelete = job;

      spyOn($scope, "resetJobForms");

      $scope.cancelDeleteJob();

      expect($scope.jobToDelete).not.toEqual(job);
      expect($scope.resetJobForms).toHaveBeenCalled();
    });

    it("cancelUpdateJob should cancel updating a job", function () {
      var job = new mockJob($q);
      $scope.jobToUpdate = job;
      $scope.jobToUpdate.name = "updated job name";

      spyOn($scope, "resetJobForms");

      $scope.cancelUpdateJob();

      expect($scope.jobToUpdate).not.toEqual(job);
      expect($scope.resetJobForms).toHaveBeenCalled();
    });

    it("clearExistingSchedule should work", function () {
      $scope.jobToUpdate = new mockJob($q);
      $scope.activeModel = {};

      $scope.clearExistingSchedule();
      // @todo
    });

    it("confirmDeleteJob should confirm deleting a job", function () {
      var job = new mockJob($q);

      $scope.jobToDelete = null;
      $scope.openModal = function (name) { };

      spyOn($scope, "openModal");

      $scope.confirmDeleteJob(job);

      expect($scope.jobToDelete).toEqual(job);
      expect($scope.openModal).toHaveBeenCalled();
    });

    it("createJob should create a job", function () {
      var newJob = new mockJob($q);
      newJob.name = "New Job";
      delete newJob.id;

      spyOn($scope, "cancelCreateJob");

      $scope.createJob(newJob);
      $scope.$digest();

      expect($scope.cancelCreateJob).toHaveBeenCalled();
    });

    it("deleteJob should delete a job", function () {
      $scope.deletingJob = null;
      $scope.jobToDelete = new mockJob($q);

      spyOn($scope, "resetJobForms");

      $scope.deleteJob();
      $scope.$digest();

      expect(typeof $scope.deletingJob).toEqual("boolean");
      expect($scope.resetJobForms).toHaveBeenCalled();
    });

    it("hasMonth should work", function () {
      var activeModel = {};
      //$scope.hasMonth(activeModel, "");
      // @todo
    });

    it("hasDay should work", function () {
      var activeModel = {};
      //$scope.hasDay(activeModel, "");
      // @todo
    });

    it("openEnd should work", function () {
      // @fixme: this calls popupEnd() which does not exist.
      //$scope.openEnd(event);
      // @todo
    });

    it("openStart should work", function () {
      $scope.openStart(event);
      // @todo
    });

    it("resetJobForms should reset job form", function () {
      $scope.closeModal = function () { };

      spyOn(JobRepo, "clearValidationResults");
      spyOn($scope, "closeModal");

      var key;
      for (key in $scope.jobForms) {
        $scope.jobForms[key].$setPristine = function () { };
        spyOn($scope.jobForms[key], "$setPristine");
      }

      $scope.resetJobForms();
      $scope.$digest();

      expect(JobRepo.clearValidationResults).toHaveBeenCalled();
      expect($scope.closeModal).toHaveBeenCalled();

      for (key in $scope.jobForms) {
        expect($scope.jobForms[key].$setPristine).toHaveBeenCalled();
      }
    });

    it("setTable should start creating a job", function () {
      var data = $scope.tableParams._settings.getData();

      expect($scope.jobs).toEqual(data);
    });

    it("showScheduleOption should work", function () {
      var activeModel = {};
      $scope.showScheduleOption(activeModel, "");
      // @todo
    });

    it("startCreateJob should start creating a job", function () {
      $scope.openModal = function (name) { };

      spyOn($scope, "openModal");

      $scope.startCreateJob();

      expect($scope.openModal).toHaveBeenCalled();
    });

    it("startUpdateJob should start updating a job", function () {
      var job = new mockJob($q);
      $scope.jobToUpdate = null;
      $scope.openModal = function (name) { };

      spyOn($scope, "openModal");

      $scope.startUpdateJob(job);

      expect($scope.jobToUpdate.id).toEqual(job.id);
      expect($scope.openModal).toHaveBeenCalled();
    });

    it("toggleMonth should work", function () {
      var activeModel = {};
      //$scope.toggleMonth(activeModel, "");
      // @todo
    });

    it("toggleDay should work", function () {
      var activeModel = {};
      //$scope.toggleDay(activeModel, "");
      // @todo
    });

    it("updateJob should update a job", function () {
      $scope.updatingJob = null;
      $scope.jobToUpdate = new mockJob($q);
      $scope.jobToUpdate.name = "Updated Job 1";

      spyOn($scope, "resetJobForms");

      $scope.updateJob();
      $scope.$digest();

      expect(typeof $scope.updatingJob).toEqual("boolean");
      expect($scope.resetJobForms).toHaveBeenCalled();
    });
  });

});
