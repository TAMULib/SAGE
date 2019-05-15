describe('controller: JobManagementController', function () {

    var controller, scope, Job, JobRepo;

    beforeEach(function() {
      module('core');
      module('sage');
      module('mock.job');
      module('mock.jobRepo');
      module('mock.reader');
      module('mock.readerRepo');
      module('mock.source');
      module('mock.sourceRepo');
      module('mock.user');
      module('mock.userService');
      module('mock.writer');
      module('mock.writerRepo');
      module('mock.operatorRepo');

      inject(function ($controller, $rootScope, _Job_, _JobRepo_, _Reader_, _ReaderRepo_, _Source_, _SourceRepo_, _User_, _UserService_, _Writer_, _WriterRepo_, _OperatorRepo_) {
        installPromiseMatchers();
        scope = $rootScope.$new();

        controller = $controller('JobManagementController', {
          $scope: scope,
          Job: _Job_,
          JobRepo: _JobRepo_,
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

        Job = _Job_;
        JobRepo = _JobRepo_;

        // ensure that the isReady() is called.
        scope.$digest();
      });
    });

    describe('Is the controller defined', function () {
      it('should be defined', function () {
        expect(controller).toBeDefined();
      });
    });

    describe('Are the scope methods defined', function () {
      it('cancelCreateJob should be defined', function () {
        expect(scope.cancelCreateJob).toBeDefined();
        expect(typeof scope.cancelCreateJob).toEqual("function");
      });

      it('cancelDeleteJob should be defined', function () {
        expect(scope.cancelDeleteJob).toBeDefined();
        expect(typeof scope.cancelDeleteJob).toEqual("function");
      });

      it('cancelUpdateJob should be defined', function () {
        expect(scope.cancelUpdateJob).toBeDefined();
        expect(typeof scope.cancelUpdateJob).toEqual("function");
      });

      it('confirmDeleteJob should be defined', function () {
        expect(scope.confirmDeleteJob).toBeDefined();
        expect(typeof scope.confirmDeleteJob).toEqual("function");
      });

      it('createJob should be defined', function () {
        expect(scope.createJob).toBeDefined();
        expect(typeof scope.createJob).toEqual("function");
      });

      it('deleteJob should be defined', function () {
        expect(scope.deleteJob).toBeDefined();
        expect(typeof scope.deleteJob).toEqual("function");
      });

      it('resetJobForms should be defined', function () {
        expect(scope.resetJobForms).toBeDefined();
        expect(typeof scope.resetJobForms).toEqual("function");
      });

      it('setTable should be defined', function () {
        expect(scope.setTable).toBeDefined();
        expect(typeof scope.setTable).toEqual("function");
      });

      it('startCreateJob should be defined', function () {
        expect(scope.startCreateJob).toBeDefined();
        expect(typeof scope.startCreateJob).toEqual("function");
      });

      it('startUpdateJob should be defined', function () {
        expect(scope.startUpdateJob).toBeDefined();
        expect(typeof scope.startUpdateJob).toEqual("function");
      });

      it('updateJob should be defined', function () {
        expect(scope.updateJob).toBeDefined();
        expect(typeof scope.updateJob).toEqual("function");
      });
    });

    describe('Are the scope methods working as expected', function () {
      it('cancelCreateJob should cancel creating a job', function () {
        spyOn(scope, 'resetJobForms');

        scope.cancelCreateJob();

        expect(typeof scope.jobToCreate).toEqual("object");
        expect(scope.resetJobForms).toHaveBeenCalled();
      });

      it('cancelDeleteJob should cancel deleting a job', function () {
        scope.jobToDelete = mockJob1;

        spyOn(scope, 'resetJobForms');

        scope.cancelDeleteJob(mockJob1);

        expect(scope.jobToDelete).not.toEqual(mockJob1);
        expect(scope.resetJobForms).toHaveBeenCalled();
      });

      it('cancelUpdateJob should cancel updating a job', function () {
        scope.jobToUpdate = mockJob1;

        spyOn(scope, 'resetJobForms');

        scope.cancelUpdateJob(mockJob1);

        expect(scope.jobToUpdate).not.toEqual(mockJob1);
        expect(scope.resetJobForms).toHaveBeenCalled();
      });

      it('confirmDeleteJob should confirm deleting a job', function () {
        var job = new Job();
        job.mock(mockJob1);

        scope.jobToDelete = null;
        scope.openModal = function(name) { };

        spyOn(scope, 'openModal');

        scope.confirmDeleteJob(job);

        expect(scope.jobToDelete).toEqual(job);
        expect(scope.openModal).toHaveBeenCalled();
      });

      it('createJob should create a job', function () {
        var newJob = new Job();
        newJob.mock(mockJob1);
        newJob.name = "New Job";
        delete newJob.id;

        spyOn(scope, 'cancelCreateJob');

        scope.createJob(newJob);
        scope.$digest();

        expect(scope.cancelCreateJob).toHaveBeenCalled();
      });

      it('deleteJob should delete a job', function () {
        scope.deletingJob = null;
        scope.jobToDelete = new Job();
        scope.jobToDelete.mock(mockJob1);

        spyOn(scope, 'resetJobForms');

        scope.deleteJob();
        scope.$digest();

        expect(typeof scope.deletingJob).toEqual('boolean');
        expect(scope.resetJobForms).toHaveBeenCalled();
      });

      it('resetJobForms should reset job form', function () {
        scope.closeModal = function() { };

        spyOn(JobRepo, 'clearValidationResults');
        spyOn(scope, 'closeModal');

        var key;
        for (key in scope.jobForms) {
          scope.jobForms[key].$setPristine = function() { };
          spyOn(scope.jobForms[key], '$setPristine');
        }

        scope.resetJobForms();
        scope.$digest();

        expect(JobRepo.clearValidationResults).toHaveBeenCalled();
        expect(scope.closeModal).toHaveBeenCalled();

        for (key in scope.jobForms) {
          expect(scope.jobForms[key].$setPristine).toHaveBeenCalled();
        }
      });

      it('setTable should start creating a job', function () {
        var data = scope.tableParams._settings.getData();

        expect(scope.jobs).toEqual(data);
      });

      it('startCreateJob should start creating a job', function () {
        scope.openModal = function(name) { };

        spyOn(scope, 'openModal');

        scope.startCreateJob();

        expect(scope.openModal).toHaveBeenCalled();
      });

      it('startUpdateJob should start updating a job', function () {
        var job = new Job();
        job.mock(mockJob1);
        scope.jobToUpdate = null;
        scope.openModal = function(name) { };

        spyOn(scope, 'openModal');

        scope.startUpdateJob(job);

        expect(scope.jobToUpdate.id).toEqual(job.id);
        expect(scope.openModal).toHaveBeenCalled();
      });

      it('updateJob should update a job', function () {
        scope.updatingJob = null;
        scope.jobToUpdate = new Job();
        scope.jobToUpdate.mock(mockJob1);
        scope.jobToUpdate.name = "Updated Job 1";

        spyOn(scope, 'resetJobForms');

        scope.updateJob();
        scope.$digest();

        expect(typeof scope.updatingJob).toEqual('boolean');
        expect(scope.resetJobForms).toHaveBeenCalled();
      });
    });

});
