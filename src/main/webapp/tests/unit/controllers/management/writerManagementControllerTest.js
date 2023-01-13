describe("controller: WriterManagementController", function () {
  var $q, $scope, MockedInternalMetadata, MockedReader, MockedSource, MockedUser, MockedWriter, WriterRepo, controller;

  var initializeVariables = function () {
    inject(function (_$q_, _WriterRepo_) {
      $q = _$q_;

      MockedInternalMetadata = new mockInternalMetadata($q);
      MockedReader = new mockReader($q);
      MockedSource = new mockSource($q);
      MockedUser = new mockUser($q);
      MockedWriter = new mockWriter($q);

      WriterRepo = _WriterRepo_;
    });
  };

  var initializeController = function (settings) {
    inject(function (_$controller_, _$rootScope_, _InternalMetadata_, _InternalMetadataRepo_, _Reader_, _ReaderRepo_, _Source_, _SourceRepo_, _User_, _UserService_, _Writer_) {
      $scope = _$rootScope_.$new();

      sessionStorage.role = settings && settings.role ? settings.role : "ROLE_ADMIN";
      sessionStorage.token = settings && settings.token ? settings.token : "faketoken";

      controller = _$controller_("WriterManagementController", {
        $scope: $scope,
        Reader: _Reader_,
        ReaderRepo: _ReaderRepo_,
        Source: _Source_,
        SourceRepo: _SourceRepo_,
        User: _User_,
        UserService: _UserService_,
        Writer: _Writer_,
        WriterRepo: WriterRepo,
        InternalMetadata: _InternalMetadata_,
        InternalMetadataRepo: _InternalMetadataRepo_,
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
      "cancelCreateWriter",
      "cancelDeleteWriter",
      "cancelUpdateWriter",
      "confirmDeleteWriter",
      "createWriter",
      "deleteWriter",
      "disableSubmit",
      "resetWriterForms",
      "setTable",
      "startCreateWriter",
      "startUpdateWriter",
      "updateFields",
      "updateWriter"
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

  describe("Does the $scope method", function () {
    it("cancelCreateWriter cancel creating a writer", function () {
      $scope.writerMappings = null;

      spyOn($scope, "resetWriterForms");

      $scope.cancelCreateWriter();

      expect(typeof $scope.writerToCreate).toEqual("object");
      expect($scope.resetWriterForms).toHaveBeenCalled();
      expect($scope.writerMappings).not.toBe(null);
    });

    it("cancelDeleteWriter cancel deleting a writer", function () {
      var writer = new mockWriter($q);
      $scope.writerToDelete = writer;

      spyOn($scope, "resetWriterForms");

      $scope.cancelDeleteWriter();

      expect($scope.writerToDelete).not.toEqual(writer);
      expect($scope.resetWriterForms).toHaveBeenCalled();
    });

    it("cancelUpdateWriter cancel updating a writer", function () {
      var writer = new mockWriter($q);
      $scope.writerToUpdate = writer;

      spyOn($scope, "resetWriterForms");

      $scope.cancelUpdateWriter();

      expect($scope.writerToUpdate).not.toEqual(writer);
      expect($scope.resetWriterForms).toHaveBeenCalled();
    });

    it("confirmDeleteWriter confirm deleting a writer", function () {
      var writer = new mockWriter($q);

      $scope.writerToDelete = null;
      $scope.openModal = function (name) { };

      spyOn($scope, "openModal");

      $scope.confirmDeleteWriter(writer);

      expect($scope.writerToDelete).toEqual(writer);
      expect($scope.openModal).toHaveBeenCalled();
    });

    it("createWriter create a writer", function () {
      var newWriter = new mockWriter($q);
      newWriter.name = "New Writer";
      delete newWriter.id;

      spyOn($scope, "cancelCreateWriter");

      $scope.createWriter(newWriter);
      $scope.$digest();

      expect($scope.cancelCreateWriter).toHaveBeenCalled();
    });

    it("deleteWriter delete a writer", function () {
      $scope.deletingWriter = null;
      $scope.writerToDelete = new mockWriter($q);

      spyOn($scope, "resetWriterForms");

      $scope.deleteWriter();
      $scope.$digest();

      expect(typeof $scope.deletingWriter).toEqual("boolean");
      expect($scope.resetWriterForms).toHaveBeenCalled();
    });

    it("disableSubmit work", function () {
      var form = {};
      $scope.disableSubmit(form);
      // @todo
    });

    it("resetWriterForms reset writer form", function () {
      $scope.closeModal = function () { };

      spyOn(WriterRepo, "clearValidationResults");
      spyOn($scope, "closeModal");

      var key;
      for (key in $scope.writerForms) {
        $scope.writerForms[key].$setPristine = function () { };
        spyOn($scope.writerForms[key], "$setPristine");
      }

      $scope.resetWriterForms();
      $scope.$digest();

      expect(WriterRepo.clearValidationResults).toHaveBeenCalled();
      expect($scope.closeModal).toHaveBeenCalled();

      for (key in $scope.writerForms) {
        expect($scope.writerForms[key].$setPristine).toHaveBeenCalled();
      }
    });

    it("setTable start creating a writers", function () {
      var data = $scope.tableParams._settings.getData();

      expect($scope.writers).toEqual(data);
    });

    it("source candidates not be readOnly", function () {
      var foundReadOnlyCandidate = false;
      for (var i in $scope.sources) {
        if ($scope.sources[i].readOnly == true) {
          foundReadOnlyCandidate = true;
          break;
        }
      }

      expect(foundReadOnlyCandidate).toEqual(false);
    });

    it("updateFields work", function () {
      var writer = new mockWriter($q);
      $scope.updateFields(writer);
      // @todo
    });

    it("startCreateWriter start creating a writer", function () {
      $scope.openModal = function (name) { };

      spyOn($scope, "openModal");

      $scope.startCreateWriter();

      expect($scope.openModal).toHaveBeenCalled();
    });

    it("startUpdateWriter start updating a writer", function () {
      var writer = new mockWriter($q);
      $scope.writerToUpdate = null;
      $scope.openModal = function (name) { };

      spyOn($scope, "openModal");

      $scope.startUpdateWriter(writer);

      expect($scope.writerToUpdate).toBeDefined();
      expect($scope.writerToUpdate.id).toEqual(writer.id)
      expect($scope.openModal).toHaveBeenCalled();
    });

    it("updateWriter update a writer", function () {
      $scope.updatingWriter = null;
      $scope.writerToUpdate = new mockWriter($q);
      $scope.writerToUpdate.name = "Updated Writer 1";

      spyOn($scope, "resetWriterForms");

      $scope.updateWriter();
      $scope.$digest();

      expect(typeof $scope.updatingWriter).toEqual("boolean");
      expect($scope.resetWriterForms).toHaveBeenCalled();
    });
  });
});
