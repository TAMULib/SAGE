describe("controller: DiscoveryViewManagementController", function () {
  var $q, $scope, $timeout, DiscoveryViewRepo, MockedDiscoveryView, MockedFacetField, MockedMetadataField, MockedSearchField, MockedSource, NgTableParams, SourceRepo, controller;

  var initializeVariables = function () {
    inject(function (_$q_, _DiscoveryViewRepo_, _WsApi_, _SourceRepo_) {
      $q = _$q_;

      DiscoveryViewRepo = _DiscoveryViewRepo_;
      NgTableParams = mockNgTableParams;
      SourceRepo = _SourceRepo_;

      MockedDiscoveryView = new mockDiscoveryView($q);
      MockedFacetField = new mockFacetField($q);
      MockedMetadataField = new mockMetadataField($q);
      MockedSearchField = new mockSearchField($q);
      MockedSource = new mockSource($q);
    });
  };

  var initializeController = function (settings) {
    inject(function (_$controller_, _$rootScope_, _$timeout_, _DiscoveryView_, _FacetField_, _MetadataField_, _SearchField_, _Source_) {
      $scope = _$rootScope_.$new();
      $timeout = _$timeout_;

      sessionStorage.role = settings && settings.role ? settings.role : "ROLE_ADMIN";
      sessionStorage.token = settings && settings.token ? settings.token : "faketoken";

      controller = _$controller_("DiscoveryViewManagementController", {
        $scope: $scope,
        DiscoveryView: _DiscoveryView_,
        DiscoveryViewRepo: DiscoveryViewRepo,
        FacetField: _FacetField_,
        MetadataField: _MetadataField_,
        NgTableParams: NgTableParams,
        SearchField: _SearchField_,
        Source: _Source_,
        SourceRepo: SourceRepo
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
    module("mock.discoveryView", function ($provide) {
      var DiscoveryView = function () {
        return MockedDiscoveryView;
      };
      $provide.value("DiscoveryView", DiscoveryView);
    });
    module("mock.discoveryViewRepo");
    module("mock.facetField", function ($provide) {
      var FacetField = function () {
        return MockedFacetField;
      };
      $provide.value("FacetField", FacetField);
    });
    module("mock.metadataField", function ($provide) {
      var MetadataField = function () {
        return MockedMetadataField;
      };
      $provide.value("MetadataField", MetadataField);
    });
    module("mock.ngTableParams");
    module("mock.searchField", function ($provide) {
      var SearchField = function () {
        return MockedSearchField;
      };
      $provide.value("SearchField", SearchField);
    });
    module("mock.source", function ($provide) {
      var Source = function () {
        return MockedSource;
      };
      $provide.value("Source", Source);
    });
    module("mock.sourceRepo");
    module("mock.wsApi");

    installPromiseMatchers();
    initializeVariables();
    initializeController();
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
      "appendFacetFieldItem",
      "appendResultMetadataFieldItem",
      "appendSearchFieldItem",
      "back",
      "cancelCreateDiscoveryView",
      "cancelDeleteDiscoveryView",
      "cancelUpdateDiscoveryView",
      "confirmDeleteDiscoveryView",
      "createDiscoveryView",
      "deleteDiscoveryView",
      "findFieldByKey",
      "getFields",
      "isDiscoveryViewFacetsInvalid",
      "isDiscoveryViewGeneralInvalid",
      "isDiscoveryViewResultsInvalid",
      "isDiscoveryViewSearchInvalid",
      "isTransitionDenied",
      "next",
      "pingSource",
      "refreshSource",
      "resetDiscoveryViewForms",
      "startCreateDiscoveryView",
      "startUpdateDiscoveryView",
      "updateDiscoveryView"
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

  describe("Do the $scope methods work as expected", function () {
    it("appendFacetFieldItem should work", function () {
      var discoveryView = new mockDiscoveryView($q);
      delete discoveryView.facetFields;

      $scope.appendFacetFieldItem(discoveryView);
      expect(discoveryView.facetFields.length).toBe(1);

      $scope.appendFacetFieldItem(discoveryView);
      expect(discoveryView.facetFields.length).toBe(2);
    });

    it("appendResultMetadataFieldItem should work", function () {
      var discoveryView = new mockDiscoveryView($q);
      delete discoveryView.resultMetadataFields;

      $scope.appendResultMetadataFieldItem(discoveryView);
      expect(discoveryView.resultMetadataFields.length).toBe(1);

      $scope.appendResultMetadataFieldItem(discoveryView);
      expect(discoveryView.resultMetadataFields.length).toBe(2);
    });

    it("appendSearchFieldItem should work", function () {
      var discoveryView = new mockDiscoveryView($q);
      delete discoveryView.searchFields;

      result = $scope.appendSearchFieldItem(discoveryView);
      expect(discoveryView.searchFields.length).toBe(1);

      result = $scope.appendSearchFieldItem(discoveryView);
      expect(discoveryView.searchFields.length).toBe(2);
    });

    it("back should work", function () {
      $scope.tabs.active = $scope.tabs.length + 1;
      $scope.back();
      expect($scope.tabs.active).toBe($scope.tabs.length - 1);

      $scope.tabs.active = 1;
      $scope.back();
      expect($scope.tabs.active).toBe(0);

      $scope.back();
      expect($scope.tabs.active).toBe(0);

      $scope.tabs.active = -1;
      $scope.back();
      expect($scope.tabs.active).toBe(0);
    });

    it("cancelCreateDiscoveryView should work", function () {
      var result;

      result = $scope.cancelCreateDiscoveryView();
      // @todo
    });

    it("cancelDeleteDiscoveryView should work", function () {
      var result;

      result = $scope.cancelDeleteDiscoveryView();
      // @todo
    });

    it("cancelUpdateDiscoveryView should work", function () {
      var result;

      result = $scope.cancelUpdateDiscoveryView();
      // @todo
    });

    it("createDiscoveryView should work", function () {
      var discoveryView = new mockDiscoveryView($q);
      $scope.discoveryView = discoveryView;

      $scope.discoveryViewToCreate = DiscoveryViewRepo.getScaffold();

      spyOn(DiscoveryViewRepo, "create").and.callThrough();
      spyOn($scope, "cancelCreateDiscoveryView");

      $scope.createDiscoveryView();
      $scope.$digest();

      expect(DiscoveryViewRepo.create).toHaveBeenCalled();
      expect($scope.cancelCreateDiscoveryView).toHaveBeenCalled();

      $scope.discoveryView = discoveryView;
      $scope.discoveryView.facetFields = [new mockFacetField($q)];
      $scope.discoveryView.facetFields[0].key = "";
      $scope.discoveryView.resultMetadataFields = [new mockMetadataField($q)];
      $scope.discoveryView.resultMetadataFields[0].key = "";
      $scope.createDiscoveryView();
      $scope.$digest();

      expect(DiscoveryViewRepo.create).toHaveBeenCalled();
      expect($scope.discoveryView.facetFields.length).toBe(0);
      expect($scope.discoveryView.resultMetadataFields.length).toBe(0);
    });

    it("deleteDiscoveryView should work", function () {
      var result;
      var discoveryView = new mockDiscoveryView($q);

      $scope.discoveryView = discoveryView;

      result = $scope.deleteDiscoveryView();
      $scope.$digest();
      // @todo
    });

    it("confirmDeleteDiscoveryView should work", function () {
      var result;

      result = $scope.confirmDeleteDiscoveryView();
      // @todo
    });

    it("findFieldByKey should work", function () {
      var result;

      result = $scope.findFieldByKey();
      // @todo
    });

    it("getFields should work", function () {
      var discoveryView = new mockDiscoveryView($q);
      var receivedUri;
      var receivedFilter;

      discoveryView.source = [];
      discoveryView.source.requiresFilter = false;

      SourceRepo.getAvailableFields = function (uri, filter) {
        return new Promise((resolve, reject) => {
          receivedUri = uri;
          receivedFilter = filter;
          resolve();
        });
      };

      spyOn(SourceRepo, "getAvailableFields").and.callThrough();

      $scope.getFields(discoveryView);
      expect(SourceRepo.getAvailableFields).not.toHaveBeenCalled();

      discoveryView.source = new mockSource($q);
      $scope.getFields(discoveryView);
      expect(SourceRepo.getAvailableFields).toHaveBeenCalled();
      expect(receivedUri).toBe(discoveryView.source.uri);
      expect(receivedFilter).toBe(discoveryView.filter);

      discoveryView.filter = "";
      discoveryView.source.requiresFilter = true;
      $scope.getFields(discoveryView);
      expect(receivedUri).toBe(discoveryView.source.uri);
      expect(receivedFilter).toBe("*.*");
    });

    it("isDiscoveryViewFacetsInvalid should work", function () {
      var result;

      result = $scope.isDiscoveryViewFacetsInvalid("create");
      // @todo
    });

    it("isDiscoveryViewGeneralInvalid should work", function () {
      var result;
      $scope.discoveryViewForms = {};
      $scope.discoveryViewForms.create = new mockDiscoveryView($q);

      result = $scope.isDiscoveryViewGeneralInvalid("create");
      // @todo
    });

    it("isDiscoveryViewResultsInvalid should work", function () {
      var result;
      $scope.discoveryViewForms = {};
      $scope.discoveryViewForms.create = new mockDiscoveryView($q);

      result = $scope.isDiscoveryViewResultsInvalid("create");
      // @todo
    });

    it("isDiscoveryViewSearchInvalid should work", function () {
      var result;

      result = $scope.isDiscoveryViewSearchInvalid("create");
      // @todo
    });

    it("isTransitionDenied should transition per completed state for create", function () {
      var result;

      $scope.discoveryViewForms.create = {
        $pristine: false,
        $setPristine: function () { this.$pristine = true; }
      };

      $scope.tabs.inCreate = true;
      $scope.tabs.inUpdate = false;
      $scope.tabs.completed = 3;
      result = $scope.isTransitionDenied(0);
      expect(result).toBe(false);

      result = $scope.isTransitionDenied(1);
      expect(result).toBe(false);

      result = $scope.isTransitionDenied(2);
      expect(result).toBe(false);

      result = $scope.isTransitionDenied(3);
      expect(result).toBe(false);

      $scope.tabs.completed = 2;
      result = $scope.isTransitionDenied(0);
      expect(result).toBe(false);

      result = $scope.isTransitionDenied(1);
      expect(result).toBe(false);

      result = $scope.isTransitionDenied(2);
      expect(result).toBe(false);

      result = $scope.isTransitionDenied(3);
      expect(result).toBe(true);

      $scope.tabs.completed = 1;
      result = $scope.isTransitionDenied(0);
      expect(result).toBe(false);

      result = $scope.isTransitionDenied(1);
      expect(result).toBe(false);

      result = $scope.isTransitionDenied(2);
      expect(result).toBe(true);

      result = $scope.isTransitionDenied(3);
      expect(result).toBe(true);

      $scope.tabs.completed = 0;
      result = $scope.isTransitionDenied(0);
      expect(result).toBe(false);

      result = $scope.isTransitionDenied(1);
      expect(result).toBe(true);

      result = $scope.isTransitionDenied(2);
      expect(result).toBe(true);

      result = $scope.isTransitionDenied(3);
      expect(result).toBe(true);
    });

    it("isTransitionDenied should transition per completed state for update", function () {
      var result;

      $scope.discoveryViewForms.update = {
        $pristine: false,
        $setPristine: function () { this.$pristine = true; }
      };

      $scope.tabs.inCreate = false;
      $scope.tabs.inUpdate = true;
      $scope.tabs.completed = 3;
      result = $scope.isTransitionDenied(0);
      expect(result).toBe(false);

      result = $scope.isTransitionDenied(1);
      expect(result).toBe(false);

      result = $scope.isTransitionDenied(2);
      expect(result).toBe(false);

      result = $scope.isTransitionDenied(3);
      expect(result).toBe(false);

      $scope.tabs.completed = 2;
      result = $scope.isTransitionDenied(0);
      expect(result).toBe(false);

      result = $scope.isTransitionDenied(1);
      expect(result).toBe(false);

      result = $scope.isTransitionDenied(2);
      expect(result).toBe(false);

      result = $scope.isTransitionDenied(3);
      expect(result).toBe(true);

      $scope.tabs.completed = 1;
      result = $scope.isTransitionDenied(0);
      expect(result).toBe(false);

      result = $scope.isTransitionDenied(1);
      expect(result).toBe(false);

      result = $scope.isTransitionDenied(2);
      expect(result).toBe(true);

      result = $scope.isTransitionDenied(3);
      expect(result).toBe(true);

      $scope.tabs.completed = 0;
      result = $scope.isTransitionDenied(0);
      expect(result).toBe(false);

      result = $scope.isTransitionDenied(1);
      expect(result).toBe(true);

      result = $scope.isTransitionDenied(2);
      expect(result).toBe(true);

      result = $scope.isTransitionDenied(3);
      expect(result).toBe(true);
    });

    it("isTransitionDenied should transition per tab valid state, for create", function () {
      var result;
      var mockInvalidGeneralTab = false;
      var mockInvalidFacetsTab = false;
      var mockInvalidSearchTab = false;
      var mockInvalidResultsTab = false;

      $scope.discoveryViewForms.create = {
        $pristine: false,
        $setPristine: function () { this.$pristine = true; }
      };

      $scope.tabs.inCreate = true;
      $scope.tabs.inUpdate = false;
      $scope.isDiscoveryViewGeneralInvalid = function () {
        return mockInvalidGeneralTab;
      };

      $scope.isDiscoveryViewFacetsInvalid = function () {
        return mockInvalidFacetsTab;
      };

      $scope.isDiscoveryViewSearchInvalid = function () {
        return mockInvalidSearchTab;
      };

      $scope.isDiscoveryViewResultsInvalid = function () {
        return mockInvalidResultsTab;
      };

      $scope.tabs.completed = 4;
      mockInvalidResultsTab = true;
      result = $scope.isTransitionDenied(0);
      expect(result).toBe(false);

      result = $scope.isTransitionDenied(1);
      expect(result).toBe(false);

      result = $scope.isTransitionDenied(2);
      expect(result).toBe(false);

      result = $scope.isTransitionDenied(3);
      expect(result).toBe(false);

      result = $scope.isTransitionDenied(4);
      expect(result).toBe(true);

      $scope.tabs.completed = 3;
      result = $scope.isTransitionDenied(0);
      expect(result).toBe(false);

      result = $scope.isTransitionDenied(1);
      expect(result).toBe(false);

      result = $scope.isTransitionDenied(2);
      expect(result).toBe(false);

      result = $scope.isTransitionDenied(3);
      expect(result).toBe(false);

      mockInvalidResultsTab = false;
      mockInvalidSearchTab = true;
      result = $scope.isTransitionDenied(0);
      expect(result).toBe(false);

      result = $scope.isTransitionDenied(1);
      expect(result).toBe(false);

      result = $scope.isTransitionDenied(2);
      expect(result).toBe(false);

      result = $scope.isTransitionDenied(3);
      expect(result).toBe(true);

      mockInvalidSearchTab = false;
      mockInvalidFacetsTab = true;
      result = $scope.isTransitionDenied(0);
      expect(result).toBe(false);

      result = $scope.isTransitionDenied(1);
      expect(result).toBe(false);

      result = $scope.isTransitionDenied(2);
      expect(result).toBe(true);

      result = $scope.isTransitionDenied(3);
      expect(result).toBe(true);

      mockInvalidFacetsTab = false;
      mockInvalidGeneralTab = true;
      result = $scope.isTransitionDenied(0);
      expect(result).toBe(false);

      result = $scope.isTransitionDenied(1);
      expect(result).toBe(true);

      result = $scope.isTransitionDenied(2);
      expect(result).toBe(true);

      result = $scope.isTransitionDenied(3);
      expect(result).toBe(true);
    });

    it("isTransitionDenied should transition per tab valid state, for update", function () {
      var result;
      var mockInvalidGeneralTab = false;
      var mockInvalidFacetsTab = false;
      var mockInvalidSearchTab = false;
      var mockInvalidResultsTab = false;

      $scope.discoveryViewForms.update = {
        $pristine: false,
        $setPristine: function () { this.$pristine = true; }
      };

      $scope.tabs.inCreate = false;
      $scope.tabs.inUpdate = true;
      $scope.isDiscoveryViewGeneralInvalid = function () {
        return mockInvalidGeneralTab;
      };

      $scope.isDiscoveryViewFacetsInvalid = function () {
        return mockInvalidFacetsTab;
      };

      $scope.isDiscoveryViewSearchInvalid = function () {
        return mockInvalidSearchTab;
      };

      $scope.isDiscoveryViewResultsInvalid = function () {
        return mockInvalidResultsTab;
      };

      $scope.tabs.completed = 4;
      mockInvalidResultsTab = true;
      result = $scope.isTransitionDenied(0);
      expect(result).toBe(false);

      result = $scope.isTransitionDenied(1);
      expect(result).toBe(false);

      result = $scope.isTransitionDenied(2);
      expect(result).toBe(false);

      result = $scope.isTransitionDenied(3);
      expect(result).toBe(false);

      result = $scope.isTransitionDenied(4);
      expect(result).toBe(true);

      $scope.tabs.completed = 3;
      result = $scope.isTransitionDenied(0);
      expect(result).toBe(false);

      result = $scope.isTransitionDenied(1);
      expect(result).toBe(false);

      result = $scope.isTransitionDenied(2);
      expect(result).toBe(false);

      result = $scope.isTransitionDenied(3);
      expect(result).toBe(false);

      mockInvalidResultsTab = false;
      mockInvalidSearchTab = true;
      result = $scope.isTransitionDenied(0);
      expect(result).toBe(false);

      result = $scope.isTransitionDenied(1);
      expect(result).toBe(false);

      result = $scope.isTransitionDenied(2);
      expect(result).toBe(false);

      result = $scope.isTransitionDenied(3);
      expect(result).toBe(true);

      mockInvalidSearchTab = false;
      mockInvalidFacetsTab = true;
      result = $scope.isTransitionDenied(0);
      expect(result).toBe(false);

      result = $scope.isTransitionDenied(1);
      expect(result).toBe(false);

      result = $scope.isTransitionDenied(2);
      expect(result).toBe(true);

      result = $scope.isTransitionDenied(3);
      expect(result).toBe(true);

      mockInvalidFacetsTab = false;
      mockInvalidGeneralTab = true;
      result = $scope.isTransitionDenied(0);
      expect(result).toBe(false);

      result = $scope.isTransitionDenied(1);
      expect(result).toBe(true);

      result = $scope.isTransitionDenied(2);
      expect(result).toBe(true);

      result = $scope.isTransitionDenied(3);
      expect(result).toBe(true);
    });

    it("next should work", function () {
      $scope.discoveryView = new mockDiscoveryView($q);

      $scope.tabs.active = -2;
      $scope.next();
      expect($scope.tabs.active).toBe(0);

      $scope.next();
      expect($scope.tabs.active).toBe(1);

      $scope.tabs.active = $scope.tabs.length - 2;
      $scope.next();
      expect($scope.tabs.active).toBe($scope.tabs.length - 1);

      $scope.tabs.active = $scope.tabs.length;
      $scope.next();
      expect($scope.tabs.active).toBe($scope.tabs.length - 1);

      $scope.tabs.active = 0;
      $scope.originalSourceName = "different name";
      spyOn($scope, "getFields");

      $scope.next();
      expect($scope.tabs.active).toBe(1);
      expect($scope.getFields).toHaveBeenCalled();

      $scope.originalSourceName = $scope.discoveryView.source.name;
      $scope.originalFilter = $scope.discoveryView.filter;
      $scope.getFields = function () {};
      spyOn($scope, "getFields");

      $scope.tabs.active = 0;
      $scope.next();
      expect($scope.getFields).not.toHaveBeenCalled();

      $scope.originalFilter = "different filter";
      $scope.tabs.active = 0;
      $scope.next();
      expect($scope.getFields).toHaveBeenCalled();
    });

    it("pingSource should work", function () {
      var discoveryView = new mockDiscoveryView($q);
      discoveryView.source = new mockSource($q);

      spyOn(discoveryView.source, "testPing");

      $scope.pingSource(discoveryView);

      expect(discoveryView.source.testPing).toHaveBeenCalled();
    });

    it("refreshSource should work", function () {
      var discoveryView = new mockDiscoveryView($q);
      discoveryView.source = new mockSource($q);

      spyOn($scope, "getFields");

      $scope.originalSourceName = discoveryView.source.name;
      $scope.originalFilter = discoveryView.filter;

      $scope.tabs.active = 0;
      $scope.refreshSource(discoveryView);
      expect($scope.getFields).not.toHaveBeenCalled();

      $scope.tabs.active = 1;
      $scope.refreshSource(discoveryView);
      expect($scope.getFields).not.toHaveBeenCalled();

      $scope.originalSourceName = "differentName";
      $scope.refreshSource(discoveryView);
      expect($scope.getFields).toHaveBeenCalled();

      $scope.originalSourceName = discoveryView.source.name;
      $scope.tabs.active = 1;
      $scope.getFields = function () {};
      spyOn($scope, "getFields");

      $scope.refreshSource(discoveryView);
      expect($scope.getFields).not.toHaveBeenCalled();

      $scope.originalFilter = "different filter";
      $scope.refreshSource(discoveryView);
      expect($scope.getFields).toHaveBeenCalled();
    });

    it("resetDiscoveryViewForms should work", function () {
      $scope.discoveryView = new mockDiscoveryView($q);

      $scope.resetDiscoveryViewForms();
      $timeout.flush();

      expect($scope.discoveryView).not.toBeDefined();

      $scope.discoveryView = new mockDiscoveryView($q);
      $scope.discoveryViewForms.create = {
        $pristine: false,
        $setPristine: function () { this.$pristine = true; }
      };

      $scope.resetDiscoveryViewForms();
      $timeout.flush();

      expect($scope.discoveryViewForms.create.$pristine).toBe(true);
      expect($scope.discoveryView).not.toBeDefined();
    });

    it("startCreateDiscoveryView should work", function () {
      var result;

      result = $scope.startCreateDiscoveryView();
      // @todo
    });

    it("startUpdateDiscoveryView should work", function () {
      var result;
      var dv = new mockDiscoveryView($q);

      result = $scope.startUpdateDiscoveryView(dv);
      // @todo
    });

    it("updateDiscoveryView should work", function () {
      var discoveryView = new mockDiscoveryView($q);
      $scope.discoveryView = discoveryView;
      $scope.discoveryView.resultMetadataFields = [new mockMetadataField($q), new mockMetadataField($q)];

      spyOn(discoveryView, "save").and.callThrough();

      $scope.updateDiscoveryView();
      $scope.$digest();

      expect(discoveryView.save).toHaveBeenCalled();

      $scope.discoveryView = discoveryView;
      $scope.discoveryView.facetFields = [new mockFacetField($q)];
      $scope.discoveryView.facetFields[0].key = "";
      $scope.discoveryView.resultMetadataFields = [new mockMetadataField($q)];
      $scope.discoveryView.resultMetadataFields[0].key = "";
      $scope.updateDiscoveryView();
      $scope.$digest();

      expect(discoveryView.save).toHaveBeenCalled();
      expect($scope.discoveryView.facetFields.length).toBe(0);
      expect($scope.discoveryView.resultMetadataFields.length).toBe(0);
    });
  });

});
