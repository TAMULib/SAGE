describe("controller: DiscoveryViewManagementController", function () {
  var controller, q, scope, DiscoveryView, DiscoveryViewRepo, FacetField, MetadataField, NgTableParams, SearchField;

  var initializeVariables = function(settings) {
    inject(function ($q, _DiscoveryViewRepo_, _WsApi_) {
      q = $q;

      DiscoveryViewRepo = _DiscoveryViewRepo_;
      NgTableParams = mockNgTableParams;

      DiscoveryView = function() {
        return new mockDiscoveryView(q);
      };

      FacetField = function() {
        return new mockFacetField(q);
      };

      MetadataField = function() {
        return new mockMetadataField(q);
      };

      SearchField = function() {
        return new mockSearchField(q);
      };
    });
  };

  var initializeController = function(settings) {
    inject(function ($controller, $rootScope, _Source_, _SourceRepo_) {
      scope = $rootScope.$new();

      sessionStorage.role = settings && settings.role ? settings.role : "ROLE_ADMIN";
      sessionStorage.token = settings && settings.token ? settings.token : "faketoken";

      controller = $controller("DiscoveryViewManagementController", {
        $scope: scope,
        DiscoveryView: DiscoveryView,
        DiscoveryViewRepo: DiscoveryViewRepo,
        FacetField: FacetField,
        MetadataField: MetadataField,
        NgTableParams: NgTableParams,
        SearchField: SearchField,
        Source: _Source_,
        SourceRepo: _SourceRepo_
      });

      // ensure that the isReady() is called.
      if (!scope.$$phase) {
        scope.$digest();
      }
    });
  };

  beforeEach(function() {
    module("core");
    module("sage");
    module("mock.discoveryView");
    module("mock.discoveryViewRepo");
    module("mock.facetField");
    module("mock.metadataField");
    module("mock.ngTableParams");
    module("mock.searchField");
    module("mock.source");
    module("mock.sourceRepo");
    module("mock.wsApi");

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
    it("appendFacetFieldItem should be defined", function () {
      expect(scope.appendFacetFieldItem).toBeDefined();
      expect(typeof scope.appendFacetFieldItem).toEqual("function");
    });

    it("appendResultMetadataFieldItem should be defined", function () {
      expect(scope.appendResultMetadataFieldItem).toBeDefined();
      expect(typeof scope.appendResultMetadataFieldItem).toEqual("function");
    });

    it("appendSearchFieldItem should be defined", function () {
      expect(scope.appendSearchFieldItem).toBeDefined();
      expect(typeof scope.appendSearchFieldItem).toEqual("function");
    });

    it("back should be defined", function () {
      expect(scope.back).toBeDefined();
      expect(typeof scope.back).toEqual("function");
    });

    it("cancelCreateDiscoveryView should be defined", function () {
      expect(scope.cancelCreateDiscoveryView).toBeDefined();
      expect(typeof scope.cancelCreateDiscoveryView).toEqual("function");
    });

    it("cancelDeleteDiscoveryView should be defined", function () {
      expect(scope.cancelDeleteDiscoveryView).toBeDefined();
      expect(typeof scope.cancelDeleteDiscoveryView).toEqual("function");
    });

    it("cancelUpdateDiscoveryView should be defined", function () {
      expect(scope.cancelUpdateDiscoveryView).toBeDefined();
      expect(typeof scope.cancelUpdateDiscoveryView).toEqual("function");
    });

    it("confirmDeleteDiscoveryView should be defined", function () {
      expect(scope.confirmDeleteDiscoveryView).toBeDefined();
      expect(typeof scope.confirmDeleteDiscoveryView).toEqual("function");
    });

    it("createDiscoveryView should be defined", function () {
      expect(scope.createDiscoveryView).toBeDefined();
      expect(typeof scope.createDiscoveryView).toEqual("function");
    });

    it("deleteDiscoveryView should be defined", function () {
      expect(scope.deleteDiscoveryView).toBeDefined();
      expect(typeof scope.deleteDiscoveryView).toEqual("function");
    });

    it("findFieldByKey should be defined", function () {
      expect(scope.findFieldByKey).toBeDefined();
      expect(typeof scope.findFieldByKey).toEqual("function");
    });

    it("getFields should be defined", function () {
      expect(scope.getFields).toBeDefined();
      expect(typeof scope.getFields).toEqual("function");
    });

    it("isDiscoveryViewFacetsInvalid should be defined", function () {
      expect(scope.isDiscoveryViewFacetsInvalid).toBeDefined();
      expect(typeof scope.isDiscoveryViewFacetsInvalid).toEqual("function");
    });

    it("isDiscoveryViewGeneralInvalid should be defined", function () {
      expect(scope.isDiscoveryViewGeneralInvalid).toBeDefined();
      expect(typeof scope.isDiscoveryViewGeneralInvalid).toEqual("function");
    });

    it("isDiscoveryViewResultsInvalid should be defined", function () {
      expect(scope.isDiscoveryViewResultsInvalid).toBeDefined();
      expect(typeof scope.isDiscoveryViewResultsInvalid).toEqual("function");
    });

    it("isDiscoveryViewSearchInvalid should be defined", function () {
      expect(scope.isDiscoveryViewSearchInvalid).toBeDefined();
      expect(typeof scope.isDiscoveryViewSearchInvalid).toEqual("function");
    });

    it("next should be defined", function () {
      expect(scope.next).toBeDefined();
      expect(typeof scope.next).toEqual("function");
    });

    it("refreshSource should be defined", function () {
      expect(scope.refreshSource).toBeDefined();
      expect(typeof scope.refreshSource).toEqual("function");
    });

    it("resetDiscoveryViewForms should be defined", function () {
      expect(scope.resetDiscoveryViewForms).toBeDefined();
      expect(typeof scope.resetDiscoveryViewForms).toEqual("function");
    });

    it("startCreateDiscoveryView should be defined", function () {
      expect(scope.startCreateDiscoveryView).toBeDefined();
      expect(typeof scope.startCreateDiscoveryView).toEqual("function");
    });

    it("startUpdateDiscoveryView should be defined", function () {
      expect(scope.startUpdateDiscoveryView).toBeDefined();
      expect(typeof scope.startUpdateDiscoveryView).toEqual("function");
    });

    it("updateDiscoveryView should be defined", function () {
      expect(scope.updateDiscoveryView).toBeDefined();
      expect(typeof scope.updateDiscoveryView).toEqual("function");
    });
  });

  describe("Do the scope methods work as expected", function () {
    it("appendFacetFieldItem should work", function () {
      var dv = new mockDiscoveryView(q);
      var length = dv.facetFields.length;

      scope.appendFacetFieldItem(dv);
      expect(dv.facetFields.length).toBe(length + 1);
    });

    it("appendResultMetadataFieldItem should work", function () {
      var dv = new mockDiscoveryView(q);
      var length = dv.resultMetadataFields.length;

      scope.appendResultMetadataFieldItem(dv);
      expect(dv.resultMetadataFields.length).toBe(length + 1);
    });

    it("appendSearchFieldItem should work", function () {
      var dv = new mockDiscoveryView(q);
      var length = dv.searchFields.length;

      result = scope.appendSearchFieldItem(dv);
      expect(dv.searchFields.length).toBe(length + 1);
    });

    it("back should work", function () {
      scope.tabs.active = scope.tabs.length + 1;
      scope.back();
      expect(scope.tabs.active).toBe(scope.tabs.length - 1);

      scope.tabs.active = 1;
      scope.back();
      expect(scope.tabs.active).toBe(0);

      scope.back();
      expect(scope.tabs.active).toBe(0);

      scope.tabs.active = -1;
      scope.back();
      expect(scope.tabs.active).toBe(0);
    });

    it("cancelCreateDiscoveryView should work", function () {
      var result;

      result = scope.cancelCreateDiscoveryView();
      // @todo
    });

    it("cancelDeleteDiscoveryView should work", function () {
      var result;

      result = scope.cancelDeleteDiscoveryView();
      // @todo
    });

    it("cancelUpdateDiscoveryView should work", function () {
      var result;

      result = scope.cancelUpdateDiscoveryView();
      // @todo
    });

    it("createDiscoveryView should work", function () {
      var result;
      var discoveryView = new mockDiscoveryView(q);

      scope.discoveryView = discoveryView;

      scope.discoveryViewToCreate = DiscoveryViewRepo.getScaffold();

      spyOn(DiscoveryViewRepo, "create").and.callThrough();
      spyOn(scope, "cancelCreateDiscoveryView");

      result = scope.createDiscoveryView();
      scope.$digest();

      expect(DiscoveryViewRepo.create).toHaveBeenCalled();
      expect(scope.cancelCreateDiscoveryView).toHaveBeenCalled();
    });

    it("deleteDiscoveryView should work", function () {
      var result;
      var discoveryView = new mockDiscoveryView(q);

      scope.discoveryView = discoveryView;

      result = scope.deleteDiscoveryView();
      // @todo
    });

    it("confirmDeleteDiscoveryView should work", function () {
      var result;

      result = scope.confirmDeleteDiscoveryView();
      // @todo
    });

    it("findFieldByKey should work", function () {
      var result;

      result = scope.findFieldByKey();
      // @todo
    });

    it("getFields should work", function () {
      var result;

      result = scope.getFields();
      // @todo
    });

    it("isDiscoveryViewFacetsInvalid should work", function () {
      var result;

      result = scope.isDiscoveryViewFacetsInvalid("create");
      // @todo
    });

    it("isDiscoveryViewGeneralInvalid should work", function () {
      var result;
      scope.discoveryViewForms = {};
      scope.discoveryViewForms.create = new mockDiscoveryView(q);

      result = scope.isDiscoveryViewGeneralInvalid("create");
      // @todo
    });

    it("isDiscoveryViewResultsInvalid should work", function () {
      var result;
      scope.discoveryViewForms = {};
      scope.discoveryViewForms.create = new mockDiscoveryView(q);

      result = scope.isDiscoveryViewResultsInvalid("create");
      // @todo
    });

    it("isDiscoveryViewSearchInvalid should work", function () {
      var result;

      result = scope.isDiscoveryViewSearchInvalid("create");
      // @todo
    });

    it("next should work", function () {
      scope.tabs.active = -2;
      scope.next();
      expect(scope.tabs.active).toBe(0);

      scope.next();
      expect(scope.tabs.active).toBe(1);

      scope.tabs.active = scope.tabs.length - 2;
      scope.next();
      expect(scope.tabs.active).toBe(scope.tabs.length - 1);

      scope.tabs.active = scope.tabs.length;
      scope.next();
      expect(scope.tabs.active).toBe(scope.tabs.length - 1);
    });

    it("refreshSource should work", function () {
      var dv = new mockDiscoveryView(q);

      spyOn(scope, 'getFields');

      scope.tabs.active = 0;
      scope.refreshSource(dv);
      expect(scope.getFields).not.toHaveBeenCalled();

      scope.tabs.active = 1;
      scope.refreshSource(dv);
      expect(scope.getFields).not.toHaveBeenCalled();

      scope.originalSourceName = "differentName";
      scope.refreshSource(dv);
      expect(scope.getFields).toHaveBeenCalled();
    });

    it("resetDiscoveryViewForms should work", function () {
      var result;

      result = scope.resetDiscoveryViewForms();
      // @todo
    });

    it("startCreateDiscoveryView should work", function () {
      var result;

      result = scope.startCreateDiscoveryView();
      // @todo
    });

    it("startUpdateDiscoveryView should work", function () {
      var result;
      var dv = new mockDiscoveryView(q);

      result = scope.startUpdateDiscoveryView(dv);
      // @todo
    });

    it("updateDiscoveryView should work", function () {
      var result;
      var discoveryView = new mockDiscoveryView(q);

      scope.discoveryView = discoveryView;

      result = scope.updateDiscoveryView();
      // @todo
    });
  });

});
