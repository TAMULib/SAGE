describe("controller: ReaderManagementController", function () {
  var $q, $scope, MockedReader, MockedSource, MockedInternalMetadata, MockedUser, ReaderRepo, controller;

  var initializeVariables = function () {
    inject(function (_$q_, _ReaderRepo_) {
      $q = _$q_;

      MockedReader = new mockReader($q);
      MockedSource = new mockSource($q);
      MockedInternalMetadata = new mockInternalMetadata($q);
      MockedUser = new mockUser($q);

      ReaderRepo = _ReaderRepo_;
    });
  };

  var initializeController = function (settings) {
    inject(function (_$controller_, _$rootScope_, _InternalMetadata_, _InternalMetadataRepo_, _Reader_, _Source_, _SourceRepo_, _User_, _UserService_) {
      $scope = _$rootScope_.$new();

      sessionStorage.role = settings && settings.role ? settings.role : "ROLE_ADMIN";
      sessionStorage.token = settings && settings.token ? settings.token : "faketoken";

      controller = _$controller_("ReaderManagementController", {
        $scope: $scope,
        InternalMetadata: _InternalMetadata_,
        InternalMetadataRepo: _InternalMetadataRepo_,
        Reader: _Reader_,
        ReaderRepo: ReaderRepo,
        Source: _Source_,
        SourceRepo: _SourceRepo_,
        User: _User_,
        UserService: _UserService_
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
    module("mock.internalMetadata", function ($provide) {
      var InternalMetadata = function () {
        return MockedInternalMetadata;
      };
      $provide.value("InternalMetadata", InternalMetadata);
    });
    module("mock.internalMetadataRepo");
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
    it("cancelCreateReader should be defined", function () {
      expect($scope.cancelCreateReader).toBeDefined();
      expect(typeof $scope.cancelCreateReader).toEqual("function");
    });

    it("cancelDeleteReader should be defined", function () {
      expect($scope.cancelDeleteReader).toBeDefined();
      expect(typeof $scope.cancelDeleteReader).toEqual("function");
    });

    it("cancelUpdateReader should be defined", function () {
      expect($scope.cancelUpdateReader).toBeDefined();
      expect(typeof $scope.cancelUpdateReader).toEqual("function");
    });

    it("confirmDeleteReader should be defined", function () {
      expect($scope.confirmDeleteReader).toBeDefined();
      expect(typeof $scope.confirmDeleteReader).toEqual("function");
    });

    it("createReader should be defined", function () {
      expect($scope.createReader).toBeDefined();
      expect(typeof $scope.createReader).toEqual("function");
    });

    it("deleteReader should be defined", function () {
      expect($scope.deleteReader).toBeDefined();
      expect(typeof $scope.deleteReader).toEqual("function");
    });

    it("disableSubmit should be defined", function () {
      expect($scope.disableSubmit).toBeDefined();
      expect(typeof $scope.disableSubmit).toEqual("function");
    });

    it("getFields should be defined", function () {
      expect($scope.getFields).toBeDefined();
      expect(typeof $scope.getFields).toEqual("function");
    });

    it("resetReaderForms should be defined", function () {
      expect($scope.resetReaderForms).toBeDefined();
      expect(typeof $scope.resetReaderForms).toEqual("function");
    });

    it("setTable should be defined", function () {
      expect($scope.setTable).toBeDefined();
      expect(typeof $scope.setTable).toEqual("function");
    });

    it("sourceChanged should be defined", function () {
      expect($scope.sourceChanged).toBeDefined();
      expect(typeof $scope.sourceChanged).toEqual("function");
    });

    it("startCreateReader should be defined", function () {
      expect($scope.startCreateReader).toBeDefined();
      expect(typeof $scope.startCreateReader).toEqual("function");
    });

    it("startUpdateReader should be defined", function () {
      expect($scope.startUpdateReader).toBeDefined();
      expect(typeof $scope.startUpdateReader).toEqual("function");
    });

    it("updateReader should be defined", function () {
      expect($scope.updateReader).toBeDefined();
      expect(typeof $scope.updateReader).toEqual("function");
    });
  });

  describe("Are the $scope methods working as expected", function () {
    it("cancelCreateReader should cancel creating a reader", function () {
      $scope.readerFields = null;

      spyOn($scope, "resetReaderForms");

      $scope.cancelCreateReader();

      expect(typeof $scope.readerToCreate).toEqual("object");
      expect($scope.resetReaderForms).toHaveBeenCalled();
      expect($scope.readerFields).not.toBe(null);
    });

    it("cancelDeleteReader should cancel deleting a reader", function () {
      var reader = new mockReader($q);
      $scope.readerToDelete = reader;

      spyOn($scope, "resetReaderForms");

      $scope.cancelDeleteReader();

      expect($scope.readerToDelete).not.toEqual(reader);
      expect($scope.resetReaderForms).toHaveBeenCalled();
    });

    it("cancelUpdateReader should cancel updating a reader", function () {
      var reader = new mockReader($q);
      $scope.readerToUpdate = reader;

      spyOn($scope, "resetReaderForms");

      $scope.cancelUpdateReader();

      expect($scope.readerToUpdate).not.toEqual(reader);
      expect($scope.resetReaderForms).toHaveBeenCalled();
    });

    it("confirmDeleteReader should confirm deleting a reader", function () {
      var reader = new mockReader($q);

      $scope.readerToDelete = null;
      $scope.openModal = function (name) { };

      spyOn($scope, "openModal");

      $scope.confirmDeleteReader(reader);

      expect($scope.readerToDelete).toEqual(reader);
      expect($scope.openModal).toHaveBeenCalled();
    });

    it("createReader should create a reader", function () {
      var newReader = new mockReader($q);
      newReader.name = "New Reader";
      delete newReader.id;

      spyOn($scope, "cancelCreateReader");

      $scope.createReader(newReader);
      $scope.$digest();

      expect($scope.cancelCreateReader).toHaveBeenCalled();
    });

    it("deleteReader should delete a reader", function () {
      $scope.deletingReader = null;
      $scope.readerToDelete = new mockReader($q);

      spyOn($scope, "resetReaderForms");

      $scope.deleteReader();
      $scope.$digest();

      expect(typeof $scope.deletingReader).toEqual("boolean");
      expect($scope.resetReaderForms).toHaveBeenCalled();
    });

    it("disableSubmit should work", function () {
      var form = {};
      $scope.disableSubmit(form);
      // @todo
    });

    it("getFields should work", function () {
      $scope.getFields("todo", "todo");
      // @todo
    });

    it("resetReaderForms should reset reader form", function () {
      $scope.closeModal = function () { };

      spyOn(ReaderRepo, "clearValidationResults");
      spyOn($scope, "closeModal");

      var key;
      for (key in $scope.readerForms) {
        $scope.readerForms[key].$setPristine = function () { };
        spyOn($scope.readerForms[key], "$setPristine");
      }

      $scope.resetReaderForms();
      $scope.$digest();

      expect(ReaderRepo.clearValidationResults).toHaveBeenCalled();
      expect($scope.closeModal).toHaveBeenCalled();

      for (key in $scope.readerForms) {
        expect($scope.readerForms[key].$setPristine).toHaveBeenCalled();
      }
    });

    it("setTable should start creating a reader", function () {
      var data = $scope.tableParams._settings.getData();

      expect($scope.readers).toEqual(data);
    });

    it("sourceChanged should work", function () {
      $scope.sourceChanged();
      // @todo
    });

    it("startCreateReader should start creating a reader", function () {
      $scope.openModal = function (name) { };

      spyOn($scope, "openModal");

      $scope.startCreateReader();

      expect($scope.openModal).toHaveBeenCalled();
    });

    it("startUpdateReader should start updating a reader", function () {
      var reader = new mockReader($q);
      $scope.readerToUpdate = null;
      $scope.openModal = function (name) { };

      spyOn($scope, "openModal");

      $scope.startUpdateReader(reader);

      expect($scope.readerToUpdate).toEqual(reader);
      expect($scope.openModal).toHaveBeenCalled();
    });

    it("updateReader should update a reader", function () {
      $scope.updatingReader = null;
      $scope.readerToUpdate = new mockReader($q);
      $scope.readerToUpdate.name = "Updated Reader 1";

      spyOn($scope, "resetReaderForms");

      $scope.updateReader();
      $scope.$digest();

      expect(typeof $scope.updatingReader).toEqual("boolean");
      expect($scope.resetReaderForms).toHaveBeenCalled();
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
