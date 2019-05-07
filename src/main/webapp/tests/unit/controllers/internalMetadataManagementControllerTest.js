describe('controller: InternalMetadataManagementController', function () {

    var controller, scope, InternalMetadata, InternalMetadataRepo;

    beforeEach(function() {
      module('core');
      module('sage');
      module('mock.internalMetadata');
      module('mock.internalMetadataRepo');

      inject(function ($controller, $rootScope, _InternalMetadata_, _InternalMetadataRepo_) {
        installPromiseMatchers();
        scope = $rootScope.$new();

        controller = $controller('InternalMetadataManagementController', {
          $scope: scope,
          InternalMetadataRepo: _InternalMetadataRepo_
        });

        InternalMetadata = _InternalMetadata_
        InternalMetadataRepo = _InternalMetadataRepo_;

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
      it('cancelCreateInternalMetadatum should be defined', function () {
        expect(scope.cancelCreateInternalMetadatum).toBeDefined();
        expect(typeof scope.cancelCreateInternalMetadatum).toEqual("function");
      });

      it('cancelDeleteInternalMetadatum should be defined', function () {
        expect(scope.cancelDeleteInternalMetadatum).toBeDefined();
        expect(typeof scope.cancelDeleteInternalMetadatum).toEqual("function");
      });

      it('cancelUpdateInternalMetadatum should be defined', function () {
        expect(scope.cancelUpdateInternalMetadatum).toBeDefined();
        expect(typeof scope.cancelUpdateInternalMetadatum).toEqual("function");
      });

      it('confirmDeleteInternalMetadatum should be defined', function () {
        expect(scope.confirmDeleteInternalMetadatum).toBeDefined();
        expect(typeof scope.confirmDeleteInternalMetadatum).toEqual("function");
      });

      it('createInternalMetadatum should be defined', function () {
        expect(scope.createInternalMetadatum).toBeDefined();
        expect(typeof scope.createInternalMetadatum).toEqual("function");
      });

      it('deleteInternalMetadatum should be defined', function () {
        expect(scope.deleteInternalMetadatum).toBeDefined();
        expect(typeof scope.deleteInternalMetadatum).toEqual("function");
      });

      it('resetInternalMetadatumForms should be defined', function () {
        expect(scope.resetInternalMetadatumForms).toBeDefined();
        expect(typeof scope.resetInternalMetadatumForms).toEqual("function");
      });

      it('setTable should be defined', function () {
        expect(scope.setTable).toBeDefined();
        expect(typeof scope.setTable).toEqual("function");
      });

      it('startCreateInternalMetadatum should be defined', function () {
        expect(scope.startCreateInternalMetadatum).toBeDefined();
        expect(typeof scope.startCreateInternalMetadatum).toEqual("function");
      });

      it('startUpdateInternalMetadatum should be defined', function () {
        expect(scope.startUpdateInternalMetadatum).toBeDefined();
        expect(typeof scope.startUpdateInternalMetadatum).toEqual("function");
      });

      it('updateInternalMetadatum should be defined', function () {
        expect(scope.updateInternalMetadatum).toBeDefined();
        expect(typeof scope.updateInternalMetadatum).toEqual("function");
      });
    });

    describe('Are the scope methods working as expected', function () {
      it('cancelCreateInternalMetadatum should cancel creating a internalMetadatum', function () {
        spyOn(scope, 'resetInternalMetadatumForms');

        scope.cancelCreateInternalMetadatum();

        expect(typeof scope.internalMetadatumToCreate).toEqual("object");
        expect(scope.resetInternalMetadatumForms).toHaveBeenCalled();
      });

      it('cancelDeleteInternalMetadatum should cancel deleting a internalMetadatum', function () {
        scope.internalMetadatumToDelete = mockInternalMetadatum1;

        spyOn(scope, 'resetInternalMetadatumForms');

        scope.cancelDeleteInternalMetadatum(mockInternalMetadatum1);

        expect(scope.internalMetadatumToDelete).not.toEqual(mockInternalMetadatum1);
        expect(scope.resetInternalMetadatumForms).toHaveBeenCalled();
      });

      it('cancelUpdateInternalMetadatum should cancel updating a internalMetadatum', function () {
        var internalMetadatum = new InternalMetadata();
        internalMetadatum.mock(mockInternalMetadatum1);
        scope.internalMetadatumToUpdate = internalMetadatum;

        spyOn(scope, 'resetInternalMetadatumForms');

        scope.cancelUpdateInternalMetadatum(internalMetadatum);

        expect(scope.internalMetadatumToUpdate).not.toEqual(internalMetadatum);
        expect(scope.resetInternalMetadatumForms).toHaveBeenCalled();
      });

      it('confirmDeleteInternalMetadatum should confirm deleting a internalMetadatum', function () {
        var internalMetadatum = new InternalMetadata();
        internalMetadatum.mock(mockInternalMetadatum1);

        scope.internalMetadatumToDelete = null;
        scope.openModal = function(name) { };

        spyOn(scope, 'openModal');

        scope.confirmDeleteInternalMetadatum(internalMetadatum);

        expect(scope.internalMetadatumToDelete).toEqual(internalMetadatum);
        expect(scope.openModal).toHaveBeenCalled();
      });

      it('createInternalMetadatum should create a internalMetadatum', function () {
        var newInternalMetadatum = new InternalMetadata();
        newInternalMetadatum.mock(mockInternalMetadatum1);
        newInternalMetadatum.name = "New InternalMetadatum";
        delete newInternalMetadatum.id;

        spyOn(scope, 'cancelCreateInternalMetadatum');

        scope.createInternalMetadatum(newInternalMetadatum);
        scope.$digest();

        expect(scope.cancelCreateInternalMetadatum).toHaveBeenCalled();
      });

      it('deleteInternalMetadatum should delete a internalMetadatum', function () {
        scope.deletingInternalMetadatum = null;
        scope.internalMetadatumToDelete = new InternalMetadata();
        scope.internalMetadatumToDelete.mock(mockInternalMetadatum1);;

        spyOn(scope, 'resetInternalMetadatumForms');

        scope.deleteInternalMetadatum();
        scope.$digest();

        expect(typeof scope.deletingInternalMetadatum).toEqual('boolean');
        expect(scope.resetInternalMetadatumForms).toHaveBeenCalled();
      });

      it('resetInternalMetadatumForms should reset internalMetadatum form', function () {
        scope.closeModal = function() { };

        spyOn(InternalMetadataRepo, 'clearValidationResults');
        spyOn(scope, 'closeModal');

        var key;
        for (key in scope.internalMetadatumForms) {
          scope.internalMetadatumForms[key].$setPristine = function() { };
          spyOn(scope.internalMetadatumForms[key], '$setPristine');
        }

        scope.resetInternalMetadatumForms();
        scope.$digest();

        expect(InternalMetadataRepo.clearValidationResults).toHaveBeenCalled();
        expect(scope.closeModal).toHaveBeenCalled();

        for (key in scope.internalMetadatumForms) {
          expect(scope.internalMetadatumForms[key].$setPristine).toHaveBeenCalled();
        }
      });

      it('setTable should start creating a internalMetadatum', function () {
        var data = scope.tableParams._settings.getData();

        expect(scope.internalMetadata).toEqual(data);
      });

      it('startCreateInternalMetadatum should start creating a internalMetadatum', function () {
        scope.openModal = function(name) { };

        spyOn(scope, 'openModal');

        scope.startCreateInternalMetadatum();

        expect(scope.openModal).toHaveBeenCalled();
      });

      it('startUpdateInternalMetadatum should start updating a internalMetadatum', function () {
        scope.internalMetadatumToUpdate = null;
        scope.openModal = function(name) { };

        spyOn(scope, 'openModal');

        scope.startUpdateInternalMetadatum(mockInternalMetadatum1);

        expect(scope.internalMetadatumToUpdate).toEqual(mockInternalMetadatum1);
        expect(scope.openModal).toHaveBeenCalled();
      });

      it('updateInternalMetadatum should update a internalMetadatum', function () {
        scope.updatingInternalMetadatum = null;
        scope.internalMetadatumToUpdate = new InternalMetadata();
        scope.internalMetadatumToUpdate.mock(mockInternalMetadatum1);
        scope.internalMetadatumToUpdate.name = "Updated InternalMetadatum 1";

        spyOn(scope, 'resetInternalMetadatumForms');

        scope.updateInternalMetadatum();
        scope.$digest();

        expect(typeof scope.updatingInternalMetadatum).toEqual('boolean');
        expect(scope.resetInternalMetadatumForms).toHaveBeenCalled();
      });

      it('source candidates should be readOnly', function () {
        var foundWriteableCandidate = false;
        for (var i in scope.sources) {
          if (scope.sources[i].readOnly == false) {
            foundWriteableCandidate = true;
            break;
          }
        }
        expect(foundWriteableCandidate).toEqual(false);
      });
    });

});
