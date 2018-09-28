describe('controller: SourceManagementController', function () {

    var controller, scope, Source, SourceRepo;

    beforeEach(function() {
      module('core');
      module('sage');
      module('mock.source');
      module('mock.sourceRepo');
      module('mock.user');
      module('mock.userService');

      inject(function ($controller, $rootScope, _Source_, _SourceRepo_, _User_, _UserService_) {
        installPromiseMatchers();
        scope = $rootScope.$new();

        controller = $controller('SourceManagementController', {
          $scope: scope,
          Source: _Source_,
          SourceRepo: _SourceRepo_,
          User: _User_,
          UserService: _UserService_
        });

        Source = _Source_;
        SourceRepo = _SourceRepo_;

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
      it('cancelCreateSource should be defined', function () {
        expect(scope.cancelCreateSource).toBeDefined();
        expect(typeof scope.cancelCreateSource).toEqual("function");
      });

      it('cancelDeleteSource should be defined', function () {
        expect(scope.cancelDeleteSource).toBeDefined();
        expect(typeof scope.cancelDeleteSource).toEqual("function");
      });

      it('cancelUpdateSource should be defined', function () {
        expect(scope.cancelUpdateSource).toBeDefined();
        expect(typeof scope.cancelUpdateSource).toEqual("function");
      });

      it('confirmDeleteSource should be defined', function () {
        expect(scope.confirmDeleteSource).toBeDefined();
        expect(typeof scope.confirmDeleteSource).toEqual("function");
      });

      it('createSource should be defined', function () {
        expect(scope.createSource).toBeDefined();
        expect(typeof scope.createSource).toEqual("function");
      });

      it('deleteSource should be defined', function () {
        expect(scope.deleteSource).toBeDefined();
        expect(typeof scope.deleteSource).toEqual("function");
      });

      it('resetSourceForms should be defined', function () {
        expect(scope.resetSourceForms).toBeDefined();
        expect(typeof scope.resetSourceForms).toEqual("function");
      });

      it('startCreateSource should be defined', function () {
        expect(scope.startCreateSource).toBeDefined();
        expect(typeof scope.startCreateSource).toEqual("function");
      });

      it('startUpdateSource should be defined', function () {
        expect(scope.startUpdateSource).toBeDefined();
        expect(typeof scope.startUpdateSource).toEqual("function");
      });

      it('updateSource should be defined', function () {
        expect(scope.updateSource).toBeDefined();
        expect(typeof scope.updateSource).toEqual("function");
      });
    });

    describe('Are the scope methods working as expected', function () {
      it('cancelCreateSource should cancel creating a source', function () {
        spyOn(scope, 'resetSourceForms');

        scope.cancelCreateSource();

        expect(typeof scope.sourceToCreate).toEqual("object");
        expect(scope.resetSourceForms).toHaveBeenCalled();
      });

      it('cancelDeleteSource should cancel deleting a source', function () {
        scope.sourceToDelete = mockSource1;

        spyOn(scope, 'resetSourceForms');

        scope.cancelDeleteSource(mockSource1);

        expect(scope.sourceToDelete).not.toEqual(mockSource1);
        expect(scope.resetSourceForms).toHaveBeenCalled();
      });

      it('cancelUpdateSource should cancel updating a source', function () {
        scope.sourceToUpdate = mockSource1;

        spyOn(scope, 'resetSourceForms');

        scope.cancelUpdateSource(mockSource1);

        expect(scope.sourceToUpdate).not.toEqual(mockSource1);
        expect(scope.resetSourceForms).toHaveBeenCalled();
      });

      it('confirmDeleteSource should confirm deleting a source', function () {
        var source = new Source();
        source.mock(mockSource1);

        scope.sourceToDelete = null;
        scope.openModal = function(name) { };

        spyOn(scope, 'openModal');

        scope.confirmDeleteSource(source);

        expect(scope.sourceToDelete).toEqual(source);
        expect(scope.openModal).toHaveBeenCalled();
      });

      it('createSource should create a source', function () {
        var newSource = new Source();
        newSource.mock(mockSource1);
        newSource.name = "New Source";
        delete newSource.id;

        spyOn(scope, 'cancelCreateSource');

        scope.createSource(newSource);
        scope.$digest();

        expect(scope.cancelCreateSource).toHaveBeenCalled();
      });

      it('deleteSource should delete a source', function () {
        scope.deletingSource = null;
        scope.sourceToDelete = new Source();
        scope.sourceToDelete.mock(mockSource1);;

        spyOn(scope, 'resetSourceForms');

        scope.deleteSource();
        scope.$digest();

        expect(typeof scope.deletingSource).toEqual('boolean');
        expect(scope.resetSourceForms).toHaveBeenCalled();
      });

      it('resetSourceForms should reset source form', function () {
        scope.closeModal = function() { };

        spyOn(SourceRepo, 'clearValidationResults');
        spyOn(scope, 'closeModal');

        scope.resetSourceForms();
        scope.$digest();

        expect(SourceRepo.clearValidationResults).toHaveBeenCalled();
        expect(scope.closeModal).toHaveBeenCalled();
      });

      it('startCreateSource should start creating a source', function () {
        scope.openModal = function(name) { };

        spyOn(scope, 'openModal');

        scope.startCreateSource();

        expect(scope.openModal).toHaveBeenCalled();
      });

      it('startUpdateSource should start updating a source', function () {
        scope.sourceToUpdate = null;
        scope.openModal = function(name) { };

        spyOn(scope, 'openModal');

        scope.startUpdateSource(mockSource1);

        expect(scope.sourceToUpdate).toEqual(mockSource1);
        expect(scope.openModal).toHaveBeenCalled();
      });

      it('updateSource should update a source', function () {
        scope.updatingSource = null;
        scope.sourceToUpdate = new Source();
        scope.sourceToUpdate.mock(mockSource1);
        scope.sourceToUpdate.name = "Updated Source 1";

        spyOn(scope, 'resetSourceForms');

        scope.updateSource();
        scope.$digest();

        expect(typeof scope.updatingSource).toEqual('boolean');
        expect(scope.resetSourceForms).toHaveBeenCalled();
      });
    });

});
