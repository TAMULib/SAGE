describe("controller: DiscoveryViewManagementController", function () {
    var controller, q, scope, NgTableParams, WsApi;

    var initializeVariables = function(settings) {
        inject(function ($q, _WsApi_) {
            q = $q;

            NgTableParams = mockNgTableParams;
            WsApi = _WsApi_;
        });
    };

    var initializeController = function(settings) {
        inject(function ($controller, $rootScope, _DiscoveryViewRepo_, _SourceRepo_) {
            scope = $rootScope.$new();

            sessionStorage.role = settings && settings.role ? settings.role : "ROLE_ADMIN";
            sessionStorage.token = settings && settings.token ? settings.token : "faketoken";

            controller = $controller("DiscoveryViewManagementController", {
                $scope: scope,
                DiscoveryViewRepo: _DiscoveryViewRepo_,
                NgTableParams: mockNgTableParams,
                SourceRepo: _SourceRepo_,
                WsApi: WsApi
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
        it("appendSearchFieldItem should be defined", function () {
            expect(scope.appendSearchFieldItem).toBeDefined();
            expect(typeof scope.appendSearchFieldItem).toEqual("function");
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
            var result;
            var dv = new mockDiscoveryView(q);

            result = scope.appendFacetFieldItem(dv);
            // @todo
        });
        it("appendSearchFieldItem should work", function () {
            var result;
            var dv = new mockDiscoveryView(q);

            result = scope.appendSearchFieldItem(dv);
            // @todo
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
        it("confirmDeleteDiscoveryView should work", function () {
            var result;

            result = scope.confirmDeleteDiscoveryView();
            // @todo
        });
        it("createDiscoveryView should work", function () {
            var result;

            result = scope.createDiscoveryView();
            // @todo
        });
        it("deleteDiscoveryView should work", function () {
            var result;

            result = scope.deleteDiscoveryView();
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
            scope.discoveryViewToUpdate = new mockDiscoveryView(q);

            result = scope.updateDiscoveryView();
            // @todo
        });
    });

});
