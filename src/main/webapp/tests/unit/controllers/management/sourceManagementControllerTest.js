describe("controller: SourceManagementController", function () {
  var $q, $scope, MockedReader, MockedSource, MockedInternalMetadata, MockedUser, SourceRepo, controller;

  var initializeVariables = function () {
    inject(function (_$q_, _SourceRepo_) {
      $q = _$q_;

      MockedReader = new mockReader($q);
      MockedSource = new mockSource($q);
      MockedInternalMetadata = new mockInternalMetadata($q);
      MockedUser = new mockUser($q);

      SourceRepo = _SourceRepo_;
    });
  };

  var initializeController = function (settings) {
    inject(function (_$controller_, _$rootScope_, _Source_, _User_, _UserService_) {
      $scope = _$rootScope_.$new();

      sessionStorage.role = settings && settings.role ? settings.role : "ROLE_ADMIN";
      sessionStorage.token = settings && settings.token ? settings.token : "faketoken";

      controller = _$controller_("SourceManagementController", {
        $scope: $scope,
        Source: _Source_,
        SourceRepo: SourceRepo,
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
    module("templates");
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
      "cancelCreateSource",
      "cancelDeleteSource",
      "cancelUpdateSource",
      "confirmDeleteSource",
      "createSource",
      "deleteSource",
      "resetSourceForms",
      "setTable",
      "startCreateSource",
      "startUpdateSource",
      "updateSource"
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
    it("cancelCreateSource should cancel creating a source", function () {
      spyOn($scope, "resetSourceForms");

      $scope.cancelCreateSource();

      expect(typeof $scope.sourceToCreate).toEqual("object");
      expect($scope.resetSourceForms).toHaveBeenCalled();
    });

    it("cancelDeleteSource should cancel deleting a source", function () {
      var source = new mockSource($q);
      $scope.sourceToDelete = source;

      spyOn($scope, "resetSourceForms");

      $scope.cancelDeleteSource();

      expect($scope.sourceToDelete).not.toEqual(source);
      expect($scope.resetSourceForms).toHaveBeenCalled();
    });

    it("cancelUpdateSource should cancel updating a source", function () {
      var source = new mockSource($q);
      $scope.sourceToUpdate = source;

      spyOn($scope, "resetSourceForms");

      $scope.cancelUpdateSource();

      expect($scope.sourceToUpdate).not.toEqual(source);
      expect($scope.resetSourceForms).toHaveBeenCalled();
    });

    it("confirmDeleteSource should confirm deleting a source", function () {
      var source = new mockSource($q);

      $scope.sourceToDelete = null;
      $scope.openModal = function (name) { };

      spyOn($scope, "openModal");

      $scope.confirmDeleteSource(source);

      expect($scope.sourceToDelete).toEqual(source);
      expect($scope.openModal).toHaveBeenCalled();
    });

    it("createSource should create a source", function () {
      var newSource = new mockSource($q);
      newSource.name = "New Source";
      delete newSource.id;

      spyOn($scope, "cancelCreateSource");

      $scope.createSource(newSource);
      $scope.$digest();

      expect($scope.cancelCreateSource).toHaveBeenCalled();
    });

    it("deleteSource should delete a source", function () {
      $scope.deletingSource = null;
      $scope.sourceToDelete = new mockSource($q);

      spyOn($scope, "resetSourceForms");

      $scope.deleteSource();
      $scope.$digest();

      expect(typeof $scope.deletingSource).toEqual("boolean");
      expect($scope.resetSourceForms).toHaveBeenCalled();
    });

    it("resetSourceForms should reset source form", function () {
      $scope.closeModal = function () { };

      spyOn(SourceRepo, "clearValidationResults");
      spyOn($scope, "closeModal");

      var key;
      for (key in $scope.sourceForms) {
        $scope.sourceForms[key].$setPristine = function () { };
        spyOn($scope.sourceForms[key], "$setPristine");
      }

      $scope.resetSourceForms();
      $scope.$digest();

      expect(SourceRepo.clearValidationResults).toHaveBeenCalled();
      expect($scope.closeModal).toHaveBeenCalled();

      for (key in $scope.sourceForms) {
        expect($scope.sourceForms[key].$setPristine).toHaveBeenCalled();
      }
    });

    it("setTable should start creating a sources", function () {
      var data = $scope.tableParams._settings.getData();

      expect($scope.sources).toEqual(data);
    });

    it("startCreateSource should start creating a source", function () {
      $scope.openModal = function (name) { };

      spyOn($scope, "openModal");

      $scope.startCreateSource();

      expect($scope.openModal).toHaveBeenCalled();
    });

    it("startUpdateSource should start updating a source", function () {
      var source = new mockSource($q);
      $scope.sourceToUpdate = null;
      $scope.openModal = function (name) { };

      spyOn($scope, "openModal");

      $scope.startUpdateSource(source);

      expect($scope.sourceToUpdate).toBeDefined();
      expect($scope.sourceToUpdate.id).toEqual(source.id)
      expect($scope.openModal).toHaveBeenCalled();
    });

    it("updateSource should update a source", function () {
      $scope.updatingSource = null;
      $scope.sourceToUpdate = new mockSource($q);
      $scope.sourceToUpdate.name = "Updated Source 1";

      spyOn($scope, "resetSourceForms");

      $scope.updateSource();
      $scope.$digest();

      expect(typeof $scope.updatingSource).toEqual("boolean");
      expect($scope.resetSourceForms).toHaveBeenCalled();
    });
  });
});
