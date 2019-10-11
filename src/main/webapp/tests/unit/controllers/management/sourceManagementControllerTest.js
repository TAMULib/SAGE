describe("controller: SourceManagementController", function () {
  var $q, $scope, MockedReader, MockedSource, MockedInternalMetadata, MockedUser, SourceRepo, controller;

  var initializeVariables = function() {
    inject(function (_$q_, _SourceRepo_) {
      $q = _$q_;

      MockedReader = new mockReader($q);
      MockedSource = new mockSource($q);
      MockedInternalMetadata = new mockInternalMetadata($q);
      MockedUser = new mockUser($q);

      SourceRepo = _SourceRepo_;
    });
  };

  var initializeController = function(settings) {
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

  beforeEach(function() {
    module("core");
    module("sage");
    module("mock.reader", function($provide) {
      var Reader = function() {
        return MockedReader;
      };
      $provide.value("Reader", Reader);
    });
    module("mock.readerRepo");
    module("mock.source", function($provide) {
      var Source = function() {
        return MockedSource;
      };
      $provide.value("Source", Source);
    });
    module("mock.sourceRepo");
    module("mock.internalMetadata", function($provide) {
      var InternalMetadata = function() {
        return MockedInternalMetadata;
      };
      $provide.value("InternalMetadata", InternalMetadata);
    });
    module("mock.internalMetadataRepo");
    module("mock.user", function($provide) {
      var User = function() {
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
    it("cancelCreateSource should be defined", function () {
      expect($scope.cancelCreateSource).toBeDefined();
      expect(typeof $scope.cancelCreateSource).toEqual("function");
    });

    it("cancelDeleteSource should be defined", function () {
      expect($scope.cancelDeleteSource).toBeDefined();
      expect(typeof $scope.cancelDeleteSource).toEqual("function");
    });

    it("cancelUpdateSource should be defined", function () {
      expect($scope.cancelUpdateSource).toBeDefined();
      expect(typeof $scope.cancelUpdateSource).toEqual("function");
    });

    it("confirmDeleteSource should be defined", function () {
      expect($scope.confirmDeleteSource).toBeDefined();
      expect(typeof $scope.confirmDeleteSource).toEqual("function");
    });

    it("createSource should be defined", function () {
      expect($scope.createSource).toBeDefined();
      expect(typeof $scope.createSource).toEqual("function");
    });

    it("deleteSource should be defined", function () {
      expect($scope.deleteSource).toBeDefined();
      expect(typeof $scope.deleteSource).toEqual("function");
    });

    it("resetSourceForms should be defined", function () {
      expect($scope.resetSourceForms).toBeDefined();
      expect(typeof $scope.resetSourceForms).toEqual("function");
    });

    it("setTable should be defined", function () {
      expect($scope.setTable).toBeDefined();
      expect(typeof $scope.setTable).toEqual("function");
    });

    it("startCreateSource should be defined", function () {
      expect($scope.startCreateSource).toBeDefined();
      expect(typeof $scope.startCreateSource).toEqual("function");
    });

    it("startUpdateSource should be defined", function () {
      expect($scope.startUpdateSource).toBeDefined();
      expect(typeof $scope.startUpdateSource).toEqual("function");
    });

    it("updateSource should be defined", function () {
      expect($scope.updateSource).toBeDefined();
      expect(typeof $scope.updateSource).toEqual("function");
    });
  });

  describe("Are the $scope methods working as expected", function () {
    it("cancelCreateSource should cancel creating a source", function () {
      spyOn($scope, 'resetSourceForms');

      $scope.cancelCreateSource();

      expect(typeof $scope.sourceToCreate).toEqual("object");
      expect($scope.resetSourceForms).toHaveBeenCalled();
    });

    it("cancelDeleteSource should cancel deleting a source", function () {
      var source = new mockSource($q);
      $scope.sourceToDelete = source;

      spyOn($scope, 'resetSourceForms');

      $scope.cancelDeleteSource();

      expect($scope.sourceToDelete).not.toEqual(source);
      expect($scope.resetSourceForms).toHaveBeenCalled();
    });

    it("cancelUpdateSource should cancel updating a source", function () {
      var source = new mockSource($q);
      $scope.sourceToUpdate = source;

      spyOn($scope, 'resetSourceForms');

      $scope.cancelUpdateSource();

      expect($scope.sourceToUpdate).not.toEqual(source);
      expect($scope.resetSourceForms).toHaveBeenCalled();
    });

    it("confirmDeleteSource should confirm deleting a source", function () {
      var source = new mockSource($q);

      $scope.sourceToDelete = null;
      $scope.openModal = function(name) { };

      spyOn($scope, 'openModal');

      $scope.confirmDeleteSource(source);

      expect($scope.sourceToDelete).toEqual(source);
      expect($scope.openModal).toHaveBeenCalled();
    });

    it("createSource should create a source", function () {
      var newSource = new mockSource($q);
      newSource.name = "New Source";
      delete newSource.id;

      spyOn($scope, 'cancelCreateSource');

      $scope.createSource(newSource);
      $scope.$digest();

      expect($scope.cancelCreateSource).toHaveBeenCalled();
    });

    it("deleteSource should delete a source", function () {
      $scope.deletingSource = null;
      $scope.sourceToDelete = new mockSource($q);

      spyOn($scope, 'resetSourceForms');

      $scope.deleteSource();
      $scope.$digest();

      expect(typeof $scope.deletingSource).toEqual('boolean');
      expect($scope.resetSourceForms).toHaveBeenCalled();
    });

    it("resetSourceForms should reset source form", function () {
      $scope.closeModal = function() { };

      spyOn(SourceRepo, 'clearValidationResults');
      spyOn($scope, 'closeModal');

      var key;
      for (key in $scope.sourceForms) {
        $scope.sourceForms[key].$setPristine = function() { };
        spyOn($scope.sourceForms[key], '$setPristine');
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
      $scope.openModal = function(name) { };

      spyOn($scope, 'openModal');

      $scope.startCreateSource();

      expect($scope.openModal).toHaveBeenCalled();
    });

    it("startUpdateSource should start updating a source", function () {
      var source = new mockSource($q);
      $scope.sourceToUpdate = null;
      $scope.openModal = function(name) { };

      spyOn($scope, 'openModal');

      $scope.startUpdateSource(source);

      expect($scope.sourceToUpdate).toEqual(source);
      expect($scope.openModal).toHaveBeenCalled();
    });

    it("updateSource should update a source", function () {
      $scope.updatingSource = null;
      $scope.sourceToUpdate = new mockSource($q);
      $scope.sourceToUpdate.name = "Updated Source 1";

      spyOn($scope, 'resetSourceForms');

      $scope.updateSource();
      $scope.$digest();

      expect(typeof $scope.updatingSource).toEqual('boolean');
      expect($scope.resetSourceForms).toHaveBeenCalled();
    });
  });
});
