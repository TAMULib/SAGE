describe("controller: InternalMetadataManagementController", function () {
  var $q, $scope, MockedUser, MockedInternalMetadata, NgTableParams, controller;

  var initializeVariables = function () {
    inject(function (_$q_, _InternalMetadataRepo_) {
      $q = _$q_;

      InternalMetadataRepo = _InternalMetadataRepo_;
      MockedInternalMetadata = new mockInternalMetadata($q);
      MockedUser = new mockUser($q);
      NgTableParams = mockNgTableParams;
    });
  };

  var initializeController = function (settings) {
    inject(function (_$controller_, _$rootScope_) {
      $scope = _$rootScope_.$new();

      sessionStorage.role = settings && settings.role ? settings.role : "ROLE_ADMIN";
      sessionStorage.token = settings && settings.token ? settings.token : "faketoken";

      controller = _$controller_("InternalMetadataManagementController", {
        $scope: $scope,
        InternalMetadataRepo: InternalMetadataRepo,
        NgTableParams: NgTableParams
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
    module("templates");
    module("mock.internalMetadata", function ($provide) {
      var InternalMetadata = function () {
        return MockedInternalMetadata;
      };
      $provide.value("InternalMetadata", InternalMetadata);
    });
    module("mock.internalMetadataRepo");
    module("mock.ngTableParams");
    module("mock.wsApi");
    module("mock.user", function ($provide) {
      var User = function () {
        return MockedUser;
      };
      $provide.value("User", User);
    });
    module("mock.userService");

    installPromiseMatchers();
    initializeVariables();
    initializeController();
  });

  afterEach(function () {
    $scope.$destroy();
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
      "cancelCreateInternalMetadatum",
      "cancelDeleteInternalMetadatum",
      "cancelUpdateInternalMetadatum",
      "confirmDeleteInternalMetadatum",
      "createInternalMetadatum",
      "deleteInternalMetadatum",
      "resetInternalMetadatumForms",
      "setTable",
      "startCreateInternalMetadatum",
      "startUpdateInternalMetadatum",
      "updateInternalMetadatum"
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
    it("cancelCreateInternalMetadatum should cancel creating a internalMetadata", function () {
      spyOn($scope, "resetInternalMetadatumForms");

      $scope.cancelCreateInternalMetadatum();
      $scope.$digest();

      expect(typeof $scope.internalMetadatumToCreate).toEqual("object");
      expect($scope.resetInternalMetadatumForms).toHaveBeenCalled();
    });

    it("cancelDeleteInternalMetadatum should cancel deleting a internalMetadata", function () {
      var internalMetadata = new mockInternalMetadata($q);
      $scope.internalMetadatumToDelete = internalMetadata;

      spyOn($scope, "resetInternalMetadatumForms");

      $scope.cancelDeleteInternalMetadatum(internalMetadata);

      expect($scope.internalMetadatumToDelete).not.toEqual(internalMetadata);
      expect($scope.resetInternalMetadatumForms).toHaveBeenCalled();
    });

    it("cancelUpdateInternalMetadatum should cancel updating a internalMetadata", function () {
      var internalMetadata = new mockInternalMetadata($q);
      $scope.internalMetadatumToUpdate = internalMetadata;

      spyOn($scope, "resetInternalMetadatumForms");

      $scope.cancelUpdateInternalMetadatum(internalMetadata);

      expect($scope.internalMetadatumToUpdate).not.toEqual(internalMetadata);
      expect($scope.resetInternalMetadatumForms).toHaveBeenCalled();
    });

    it("confirmDeleteInternalMetadatum should confirm deleting a internalMetadata", function () {
      var internalMetadata = new mockInternalMetadata($q);

      $scope.internalMetadatumToDelete = null;
      $scope.openModal = function (name) { };

      spyOn($scope, "openModal");

      $scope.confirmDeleteInternalMetadatum(internalMetadata);

      expect($scope.internalMetadatumToDelete).toEqual(internalMetadata);
      expect($scope.openModal).toHaveBeenCalled();
    });

    it("createInternalMetadatum should create a internalMetadata", function () {
      var newInternalMetadatum = new mockInternalMetadata($q);
      delete newInternalMetadatum.id;

      spyOn($scope, "cancelCreateInternalMetadatum");

      $scope.createInternalMetadatum(newInternalMetadatum);
      $scope.$digest();

      expect($scope.cancelCreateInternalMetadatum).toHaveBeenCalled();
    });

    it("deleteInternalMetadatum should delete a internalMetadata", function () {
      $scope.deletingInternalMetadatum = null;
      $scope.internalMetadatumToDelete = new mockInternalMetadata($q);

      spyOn($scope, "resetInternalMetadatumForms");

      $scope.deleteInternalMetadatum();
      $scope.$digest();

      expect(typeof $scope.deletingInternalMetadatum).toEqual("boolean");
      expect($scope.resetInternalMetadatumForms).toHaveBeenCalled();
    });

    it("resetInternalMetadatumForms should reset internalMetadata form", function () {
      $scope.closeModal = function () { };

      spyOn(InternalMetadataRepo, "clearValidationResults");
      spyOn($scope, "closeModal");

      var key;
      for (key in $scope.internalMetadataForms) {
        $scope.internalMetadataForms[key].$setPristine = function () { };
        spyOn($scope.internalMetadataForms[key], "$setPristine");
      }

      $scope.resetInternalMetadatumForms();
      $scope.$digest();

      expect(InternalMetadataRepo.clearValidationResults).toHaveBeenCalled();
      expect($scope.closeModal).toHaveBeenCalled();

      for (key in $scope.internalMetadataForms) {
        expect($scope.internalMetadataForms[key].$setPristine).toHaveBeenCalled();
      }
    });

    it("setTable should setup the table settings", function () {
      $scope.internalMetadata = new mockInternalMetadata($q);
      $scope.setTable();
      $scope.$digest();

      expect($scope.tableParams).toBeDefined();
    });

    it("startCreateInternalMetadatum should start creating a internalMetadata", function () {
      $scope.openModal = function (name) { };

      spyOn($scope, "openModal");

      $scope.startCreateInternalMetadatum();

      expect($scope.openModal).toHaveBeenCalled();
    });

    it("startUpdateInternalMetadatum should start updating a internalMetadata", function () {
      $scope.internalMetadatumToUpdate = null;
      $scope.openModal = function (name) { };

      spyOn($scope, "openModal");

      $scope.startUpdateInternalMetadatum(dataInternalMetadata1);

      expect($scope.internalMetadatumToUpdate).toEqual(dataInternalMetadata1);
      expect($scope.openModal).toHaveBeenCalled();
    });

    it("updateInternalMetadatum should update a internalMetadata", function () {
      $scope.internalMetadatumToUpdate = new mockInternalMetadata($q);
      $scope.updatingInternalMetadatum = null;

      spyOn($scope, "resetInternalMetadatumForms");

      $scope.updateInternalMetadatum();
      $scope.$digest();

      expect(typeof $scope.updatingInternalMetadatum).toEqual("boolean");
      expect($scope.resetInternalMetadatumForms).toHaveBeenCalled();
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
