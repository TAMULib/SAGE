describe('controller: WriterManagementController', function () {

    var controller, scope, Writer, WriterRepo;

    beforeEach(function() {
      module('core');
      module('sage');
      module('mock.reader');
      module('mock.readerRepo');
      module('mock.source');
      module('mock.sourceRepo');
      module('mock.user');
      module('mock.userService');
      module('mock.writer');
      module('mock.writerRepo');

      inject(function ($controller, $rootScope, _Reader_, _ReaderRepo_, _Source_, _SourceRepo_, _User_, _UserService_, _Writer_, _WriterRepo_) {
        installPromiseMatchers();
        scope = $rootScope.$new();

        controller = $controller('WriterManagementController', {
          $scope: scope,
          Reader: _Reader_,
          ReaderRepo: _ReaderRepo_,
          Source: _Source_,
          SourceRepo: _SourceRepo_,
          User: _User_,
          UserService: _UserService_,
          Writer: _Writer_,
          WriterRepo: _WriterRepo_
        });

        Writer = _Writer_;
        WriterRepo = _WriterRepo_;

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
      it('cancelCreateWriter should be defined', function () {
        expect(scope.cancelCreateWriter).toBeDefined();
        expect(typeof scope.cancelCreateWriter).toEqual("function");
      });

      it('cancelDeleteWriter should be defined', function () {
        expect(scope.cancelDeleteWriter).toBeDefined();
        expect(typeof scope.cancelDeleteWriter).toEqual("function");
      });

      it('cancelUpdateWriter should be defined', function () {
        expect(scope.cancelUpdateWriter).toBeDefined();
        expect(typeof scope.cancelUpdateWriter).toEqual("function");
      });

      it('confirmDeleteWriter should be defined', function () {
        expect(scope.confirmDeleteWriter).toBeDefined();
        expect(typeof scope.confirmDeleteWriter).toEqual("function");
      });

      it('createWriter should be defined', function () {
        expect(scope.createWriter).toBeDefined();
        expect(typeof scope.createWriter).toEqual("function");
      });

      it('deleteWriter should be defined', function () {
        expect(scope.deleteWriter).toBeDefined();
        expect(typeof scope.deleteWriter).toEqual("function");
      });

      it('resetWriterForms should be defined', function () {
        expect(scope.resetWriterForms).toBeDefined();
        expect(typeof scope.resetWriterForms).toEqual("function");
      });

      it('setTable should be defined', function () {
        expect(scope.setTable).toBeDefined();
        expect(typeof scope.setTable).toEqual("function");
      });

      it('startCreateWriter should be defined', function () {
        expect(scope.startCreateWriter).toBeDefined();
        expect(typeof scope.startCreateWriter).toEqual("function");
      });

      it('startUpdateWriter should be defined', function () {
        expect(scope.startUpdateWriter).toBeDefined();
        expect(typeof scope.startUpdateWriter).toEqual("function");
      });

      it('updateWriter should be defined', function () {
        expect(scope.updateWriter).toBeDefined();
        expect(typeof scope.updateWriter).toEqual("function");
      });
    });

    describe('Are the scope methods working as expected', function () {
      it('cancelCreateWriter should cancel creating a writer', function () {
        scope.newWriterFields = null;

        spyOn(scope, 'resetWriterForms');

        scope.cancelCreateWriter();

        expect(typeof scope.writerToCreate).toEqual("object");
        expect(scope.resetWriterForms).toHaveBeenCalled();
        expect(scope.newWriterFields).not.toBe(null);
      });

      it('cancelDeleteWriter should cancel deleting a writer', function () {
        scope.writerToDelete = mockWriter1;

        spyOn(scope, 'resetWriterForms');

        scope.cancelDeleteWriter(mockWriter1);

        expect(scope.writerToDelete).not.toEqual(mockWriter1);
        expect(scope.resetWriterForms).toHaveBeenCalled();
      });

      it('cancelUpdateWriter should cancel updating a writer', function () {
        scope.writerToUpdate = mockWriter1;

        spyOn(scope, 'resetWriterForms');

        scope.cancelUpdateWriter(mockWriter1);

        expect(scope.writerToUpdate).not.toEqual(mockWriter1);
        expect(scope.resetWriterForms).toHaveBeenCalled();
      });

      it('confirmDeleteWriter should confirm deleting a writer', function () {
        var writer = new Writer();
        writer.mock(mockWriter1);

        scope.writerToDelete = null;
        scope.openModal = function(name) { };

        spyOn(scope, 'openModal');

        scope.confirmDeleteWriter(writer);

        expect(scope.writerToDelete).toEqual(writer);
        expect(scope.openModal).toHaveBeenCalled();
      });

      it('createWriter should create a writer', function () {
        var newWriter = new Writer();
        newWriter.mock(mockWriter1);
        newWriter.name = "New Writer";
        delete newWriter.id;

        spyOn(scope, 'cancelCreateWriter');

        scope.createWriter(newWriter);
        scope.$digest();

        expect(scope.cancelCreateWriter).toHaveBeenCalled();
      });

      it('deleteWriter should delete a writer', function () {
        scope.deletingWriter = null;
        scope.writerToDelete = new Writer();
        scope.writerToDelete.mock(mockWriter1);;

        spyOn(scope, 'resetWriterForms');

        scope.deleteWriter();
        scope.$digest();

        expect(typeof scope.deletingWriter).toEqual('boolean');
        expect(scope.resetWriterForms).toHaveBeenCalled();
      });

      it('resetWriterForms should reset writer form', function () {
        scope.closeModal = function() { };

        spyOn(WriterRepo, 'clearValidationResults');
        spyOn(scope, 'closeModal');

        var key;
        for (key in scope.writerForms) {
          scope.writerForms[key].$setPristine = function() { };
          spyOn(scope.writerForms[key], '$setPristine');
        }

        scope.resetWriterForms();
        scope.$digest();

        expect(WriterRepo.clearValidationResults).toHaveBeenCalled();
        expect(scope.closeModal).toHaveBeenCalled();

        for (key in scope.writerForms) {
          expect(scope.writerForms[key].$setPristine).toHaveBeenCalled();
        }
      });

      it('setTable should start creating a writers', function () {
        var data = scope.tableParams._settings.getData();

        expect(scope.writers).toEqual(data);
      });

      it('startCreateWriter should start creating a writer', function () {
        scope.openModal = function(name) { };

        spyOn(scope, 'openModal');

        scope.startCreateWriter();

        expect(scope.openModal).toHaveBeenCalled();
      });

      it('startUpdateWriter should start updating a writer', function () {
        scope.writerToUpdate = null;
        scope.openModal = function(name) { };

        spyOn(scope, 'openModal');

        scope.startUpdateWriter(mockWriter1);

        expect(scope.writerToUpdate).toEqual(mockWriter1);
        expect(scope.openModal).toHaveBeenCalled();
      });

      it('updateWriter should update a writer', function () {
        scope.updatingWriter = null;
        scope.writerToUpdate = new Writer();
        scope.writerToUpdate.mock(mockWriter1);
        scope.writerToUpdate.name = "Updated Writer 1";

        spyOn(scope, 'resetWriterForms');

        scope.updateWriter();
        scope.$digest();

        expect(typeof scope.updatingWriter).toEqual('boolean');
        expect(scope.resetWriterForms).toHaveBeenCalled();
      });
    });

      it('source candidates should not be readOnly', function () {
        var foundReadOnlyCandidate = false;
        for (var i in scope.sources) {
          if (scope.sources[i].readOnly == true) {
            foundReadOnlyCandidate = true;
            break;
          }
        }
        expect(foundReadOnlyCandidate).toEqual(false);
      });

});
