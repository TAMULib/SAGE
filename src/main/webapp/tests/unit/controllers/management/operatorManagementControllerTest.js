describe("controller: OperatorManagementController", function () {
  var $q, $scope, MockedInternalMetadata, MockedOperator, NgTableParams, OperatorRepo, controller;

  var initializeVariables = function() {
    inject(function (_$q_, _OperatorRepo_) {
      $q = _$q_;

      MockedInternalMetadata = new mockInternalMetadata($q);
      MockedOperator = new mockOperator($q);
      NgTableParams = mockNgTableParams;
      OperatorRepo = _OperatorRepo_;
    });
  };

  var initializeController = function(settings) {
    inject(function (_$controller_, _$rootScope_, _InternalMetadata_, _InternalMetadataRepo_, _Operator_, _ValidationStore_) {
      $scope = _$rootScope_.$new();

      sessionStorage.role = settings && settings.role ? settings.role : "ROLE_ADMIN";
      sessionStorage.token = settings && settings.token ? settings.token : "faketoken";

      controller = _$controller_("OperatorManagementController", {
        $scope: $scope,
        InternalMetadata: _InternalMetadata_,
        InternalMetadataRepo: _InternalMetadataRepo_,
        NgTableParams: NgTableParams,
        Operator: _Operator_,
        OperatorRepo: OperatorRepo,
        ValidationStore: _ValidationStore_
      });

      // ensure that the isReady() is called.
      if (!$scope.$$phase) {
        $scope.$digest();
      }
    });
  };

  beforeEach(function() {
    module("core");
    module("sage");
    module("mock.internalMetadata", function($provide) {
      var InternalMetadata = function() {
        return MockedInternalMetadata;
      };
      $provide.value("InternalMetadata", InternalMetadata);
    });
    module("mock.internalMetadataRepo");
    module("mock.operator", function($provide) {
      var Operator = function() {
        return MockedOperator;
      };
      $provide.value("Operator", Operator);
    });
    module("mock.operatorRepo");
    module("mock.validationStore");

    installPromiseMatchers();
    initializeVariables();
    initializeController();
  });

  describe("Is the controller defined", function () {
    it("should be defined for admin", function () {
      expect(controller).toBeDefined();
    });
    it("should be defined for manager", function () {
      initializeController({role: "ROLE_MANAGER"});
      expect(controller).toBeDefined();
    });
    it("should be defined for user", function () {
      initializeController({role: "ROLE_USER"});
      expect(controller).toBeDefined();
    });
    it("should be defined for anonymous", function () {
      initializeController({role: "ROLE_ANONYMOUS"});
      expect(controller).toBeDefined();
    });
  });

  describe("Are the scope methods defined", function () {
    it("cancelCreateOperator should be defined", function () {
      expect($scope.cancelCreateOperator).toBeDefined();
      expect(typeof $scope.cancelCreateOperator).toEqual("function");
    });

    it("cancelDeleteOperator should be defined", function () {
      expect($scope.cancelDeleteOperator).toBeDefined();
      expect(typeof $scope.cancelDeleteOperator).toEqual("function");
    });

    it("cancelUpdateOperator should be defined", function () {
      expect($scope.cancelUpdateOperator).toBeDefined();
      expect(typeof $scope.cancelUpdateOperator).toEqual("function");
    });

    it("confirmDeleteOperator should be defined", function () {
      expect($scope.confirmDeleteOperator).toBeDefined();
      expect(typeof $scope.confirmDeleteOperator).toEqual("function");
    });

    it("createOperator should be defined", function () {
      expect($scope.createOperator).toBeDefined();
      expect(typeof $scope.createOperator).toEqual("function");
    });

    it("deleteOperator should be defined", function () {
      expect($scope.deleteOperator).toBeDefined();
      expect(typeof $scope.deleteOperator).toEqual("function");
    });

    it("resetOperatorForms should be defined", function () {
      expect($scope.resetOperatorForms).toBeDefined();
      expect(typeof $scope.resetOperatorForms).toEqual("function");
    });

    it("setTable should be defined", function () {
      expect($scope.setTable).toBeDefined();
      expect(typeof $scope.setTable).toEqual("function");
    });

    it("startCreateOperator should be defined", function () {
      expect($scope.startCreateOperator).toBeDefined();
      expect(typeof $scope.startCreateOperator).toEqual("function");
    });

    it("startUpdateOperator should be defined", function () {
      expect($scope.startUpdateOperator).toBeDefined();
      expect(typeof $scope.startUpdateOperator).toEqual("function");
    });

    it("updateOperator should be defined", function () {
      expect($scope.updateOperator).toBeDefined();
      expect(typeof $scope.updateOperator).toEqual("function");
    });
  });

  describe("Are the $scope methods working as expected", function () {
    it("cancelCreateOperator should cancel creating a operator", function () {
      spyOn($scope, "resetOperatorForms");

      $scope.cancelCreateOperator();

      expect(typeof $scope.operatorToCreate).toEqual("object");
      expect($scope.resetOperatorForms).toHaveBeenCalled();
    });

    it("cancelDeleteOperator should cancel deleting a operator", function () {
      var operator = new mockOperator($q);
      $scope.operatorToDelete = operator;

      spyOn($scope, "resetOperatorForms");

      $scope.cancelDeleteOperator();

      expect($scope.operatorToDelete).not.toEqual(operator);
      expect($scope.resetOperatorForms).toHaveBeenCalled();
    });

    it("cancelUpdateOperator should cancel updating a operator", function () {
      var operator = new mockOperator($q);
      $scope.operatorToUpdate = operator;

      spyOn($scope, "resetOperatorForms");

      $scope.cancelUpdateOperator(operator);

      expect($scope.operatorToUpdate).not.toEqual(operator);
      expect($scope.resetOperatorForms).toHaveBeenCalled();
    });

    it("confirmDeleteOperator should confirm deleting a operator", function () {
      var operator = new mockOperator($q);

      $scope.operatorToDelete = null;
      $scope.openModal = function(name) { };

      spyOn($scope, "openModal");

      $scope.confirmDeleteOperator(operator);

      expect($scope.operatorToDelete).toEqual(operator);
      expect($scope.openModal).toHaveBeenCalled();
    });

    it("createOperator should create a operator", function () {
      var newOperator = new mockOperator($q);
      newOperator.name = "New Operator";
      delete newOperator.id;

      spyOn($scope, "cancelCreateOperator");

      $scope.createOperator(newOperator);
      $scope.$digest();

      expect($scope.cancelCreateOperator).toHaveBeenCalled();
    });

    it("deleteOperator should delete a operator", function () {
      $scope.deletingOperator = null;
      $scope.operatorToDelete = new mockOperator($q);

      spyOn($scope, "resetOperatorForms");

      $scope.deleteOperator();
      $scope.$digest();

      expect(typeof $scope.deletingOperator).toEqual("boolean");
      expect($scope.resetOperatorForms).toHaveBeenCalled();
    });

    it("resetOperatorForms should reset operator form", function () {
      $scope.closeModal = function() { };

      spyOn(OperatorRepo, "clearValidationResults");
      spyOn($scope, "closeModal");

      var key;
      for (key in $scope.operatorForms) {
        $scope.operatorForms[key].$setPristine = function() { };
        spyOn($scope.operatorForms[key], "$setPristine");
      }

      $scope.resetOperatorForms();
      $scope.$digest();

      expect(OperatorRepo.clearValidationResults).toHaveBeenCalled();
      expect($scope.closeModal).toHaveBeenCalled();

      for (key in $scope.operatorForms) {
        expect($scope.operatorForms[key].$setPristine).toHaveBeenCalled();
      }
    });

    it("setTable should start creating a operator", function () {
      $scope.operators = new mockInternalMetadata($q);
      $scope.setTable();
      $scope.$digest();

      expect($scope.tableParams).toBeDefined();
    });

    it("startCreateOperator should start creating a operator", function () {
      $scope.openModal = function(name) { };

      spyOn($scope, "openModal");

      $scope.startCreateOperator();

      expect($scope.openModal).toHaveBeenCalled();
    });

    it("startUpdateOperator should start updating a operator", function () {
      var operator = new mockOperator($q);
      $scope.operatorToUpdate = null;
      $scope.openModal = function(name) { };

      spyOn($scope, "openModal");

      $scope.startUpdateOperator(operator);

      expect($scope.operatorToUpdate).toEqual(operator);
      expect($scope.openModal).toHaveBeenCalled();
    });

    it("updateOperator should update a operator", function () {
      $scope.updatingOperator = null;
      $scope.operatorToUpdate = new mockOperator($q);
      $scope.operatorToUpdate.name = "Updated Operator 1";

      spyOn($scope, "resetOperatorForms");

      $scope.updateOperator();
      $scope.$digest();

      expect(typeof $scope.updatingOperator).toEqual("boolean");
      expect($scope.resetOperatorForms).toHaveBeenCalled();
    });

    it("source candidates should be readOnly", function () {
      var foundWriteableCandidate = false;
      for (var i in $scope.sources) {
        if ($scope.sources[i].readOnly == false) {
          foundWriteableCandidate = true;
          break;
        }
      }
      expect(foundWriteableCandidate).toEqual(false);
    });
  });
});
