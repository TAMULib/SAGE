describe('controller: OperatorManagementController', function () {

    var controller, scope, Operator, OperatorRepo;

    beforeEach(function() {
      module('core');
      module('sage');
      module('mock.operator');
      module('mock.operatorRepo');
      module('mock.internalMetadataRepo');
      module('mock.validationStore');

      inject(function ($controller, $rootScope, _Operator_, _OperatorRepo_, _InternalMetadataRepo_, _ValidationStore_) {
        installPromiseMatchers();
        scope = $rootScope.$new();

        controller = $controller('OperatorManagementController', {
          $scope: scope,
          OperatorRepo: _OperatorRepo_,
          InternalMetadataRepo: _InternalMetadataRepo_,
          ValidationStore: _ValidationStore_
        });

        Operator = _Operator_
        OperatorRepo = _OperatorRepo_;

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
      it('cancelCreateOperator should be defined', function () {
        expect(scope.cancelCreateOperator).toBeDefined();
        expect(typeof scope.cancelCreateOperator).toEqual("function");
      });

      it('cancelDeleteOperator should be defined', function () {
        expect(scope.cancelDeleteOperator).toBeDefined();
        expect(typeof scope.cancelDeleteOperator).toEqual("function");
      });

      it('cancelUpdateOperator should be defined', function () {
        expect(scope.cancelUpdateOperator).toBeDefined();
        expect(typeof scope.cancelUpdateOperator).toEqual("function");
      });

      it('confirmDeleteOperator should be defined', function () {
        expect(scope.confirmDeleteOperator).toBeDefined();
        expect(typeof scope.confirmDeleteOperator).toEqual("function");
      });

      it('createOperator should be defined', function () {
        expect(scope.createOperator).toBeDefined();
        expect(typeof scope.createOperator).toEqual("function");
      });

      it('deleteOperator should be defined', function () {
        expect(scope.deleteOperator).toBeDefined();
        expect(typeof scope.deleteOperator).toEqual("function");
      });

      it('resetOperatorForms should be defined', function () {
        expect(scope.resetOperatorForms).toBeDefined();
        expect(typeof scope.resetOperatorForms).toEqual("function");
      });

      it('setTable should be defined', function () {
        expect(scope.setTable).toBeDefined();
        expect(typeof scope.setTable).toEqual("function");
      });

      it('startCreateOperator should be defined', function () {
        expect(scope.startCreateOperator).toBeDefined();
        expect(typeof scope.startCreateOperator).toEqual("function");
      });

      it('startUpdateOperator should be defined', function () {
        expect(scope.startUpdateOperator).toBeDefined();
        expect(typeof scope.startUpdateOperator).toEqual("function");
      });

      it('updateOperator should be defined', function () {
        expect(scope.updateOperator).toBeDefined();
        expect(typeof scope.updateOperator).toEqual("function");
      });
    });

    describe('Are the scope methods working as expected', function () {
      it('cancelCreateOperator should cancel creating a operator', function () {
        spyOn(scope, 'resetOperatorForms');

        scope.cancelCreateOperator();

        expect(typeof scope.operatorToCreate).toEqual("object");
        expect(scope.resetOperatorForms).toHaveBeenCalled();
      });

      it('cancelDeleteOperator should cancel deleting a operator', function () {
        scope.operatorToDelete = mockOperator1;

        spyOn(scope, 'resetOperatorForms');

        scope.cancelDeleteOperator(mockOperator1);

        expect(scope.operatorToDelete).not.toEqual(mockOperator1);
        expect(scope.resetOperatorForms).toHaveBeenCalled();
      });

      it('cancelUpdateOperator should cancel updating a operator', function () {
        var operator = new Operator();
        operator.mock(mockOperator1);
        scope.operatorToUpdate = operator;

        spyOn(scope, 'resetOperatorForms');

        scope.cancelUpdateOperator(operator);

        expect(scope.operatorToUpdate).not.toEqual(operator);
        expect(scope.resetOperatorForms).toHaveBeenCalled();
      });

      it('confirmDeleteOperator should confirm deleting a operator', function () {
        var operator = new Operator();
        operator.mock(mockOperator1);

        scope.operatorToDelete = null;
        scope.openModal = function(name) { };

        spyOn(scope, 'openModal');

        scope.confirmDeleteOperator(operator);

        expect(scope.operatorToDelete).toEqual(operator);
        expect(scope.openModal).toHaveBeenCalled();
      });

      it('createOperator should create a operator', function () {
        var newOperator = new Operator();
        newOperator.mock(mockOperator1);
        newOperator.name = "New Operator";
        delete newOperator.id;

        spyOn(scope, 'cancelCreateOperator');

        scope.createOperator(newOperator);
        scope.$digest();

        expect(scope.cancelCreateOperator).toHaveBeenCalled();
      });

      it('deleteOperator should delete a operator', function () {
        scope.deletingOperator = null;
        scope.operatorToDelete = new Operator();
        scope.operatorToDelete.mock(mockOperator1);;

        spyOn(scope, 'resetOperatorForms');

        scope.deleteOperator();
        scope.$digest();

        expect(typeof scope.deletingOperator).toEqual('boolean');
        expect(scope.resetOperatorForms).toHaveBeenCalled();
      });

      it('resetOperatorForms should reset operator form', function () {
        scope.closeModal = function() { };

        spyOn(OperatorRepo, 'clearValidationResults');
        spyOn(scope, 'closeModal');

        var key;
        for (key in scope.operatorForms) {
          scope.operatorForms[key].$setPristine = function() { };
          spyOn(scope.operatorForms[key], '$setPristine');
        }

        scope.resetOperatorForms();
        scope.$digest();

        expect(OperatorRepo.clearValidationResults).toHaveBeenCalled();
        expect(scope.closeModal).toHaveBeenCalled();

        for (key in scope.operatorForms) {
          expect(scope.operatorForms[key].$setPristine).toHaveBeenCalled();
        }
      });

      it('setTable should start creating a operator', function () {
        var data = scope.tableParams._settings.getData();

        expect(scope.operators).toEqual(data);
      });

      it('startCreateOperator should start creating a operator', function () {
        scope.openModal = function(name) { };

        spyOn(scope, 'openModal');

        scope.startCreateOperator();

        expect(scope.openModal).toHaveBeenCalled();
      });

      it('startUpdateOperator should start updating a operator', function () {
        scope.operatorToUpdate = null;
        scope.openModal = function(name) { };

        spyOn(scope, 'openModal');

        scope.startUpdateOperator(mockOperator1);

        expect(scope.operatorToUpdate).toEqual(mockOperator1);
        expect(scope.openModal).toHaveBeenCalled();
      });

      it('updateOperator should update a operator', function () {
        scope.updatingOperator = null;
        scope.operatorToUpdate = new Operator();
        scope.operatorToUpdate.mock(mockOperator1);
        scope.operatorToUpdate.name = "Updated Operator 1";

        spyOn(scope, 'resetOperatorForms');

        scope.updateOperator();
        scope.$digest();

        expect(typeof scope.updatingOperator).toEqual('boolean');
        expect(scope.resetOperatorForms).toHaveBeenCalled();
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
