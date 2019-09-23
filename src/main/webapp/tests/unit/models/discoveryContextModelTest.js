describe('model: DiscoveryContext', function () {
    var model, rootScope, scope, location, WsApi;

    var initializeVariables = function(settings) {
        inject(function ($location, $rootScope, _WsApi_) {
            location = $location;
            rootScope = $rootScope;

            WsApi = _WsApi_;
        });
    };

    var initializeModel = function(settings) {
        inject(function (DiscoveryContext) {
            scope = rootScope.$new();

            model = angular.extend(new DiscoveryContext(), dataDiscoveryContext1);
        });
    };

    beforeEach(function() {
        module('core');
        module('sage');
        module('mock.wsApi');

        initializeVariables();
        initializeModel();
    });

    describe('Is the model defined', function () {
        it('should be defined', function () {
            expect(model).toBeDefined();
        });
    });

    describe('Are the model methods defined', function () {
        it('clearFilters should be defined', function () {
            expect(model.clearFilters).toBeDefined();
            expect(typeof model.clearFilters).toEqual("function");
        });
        it('executeSearch should be defined', function () {
            expect(model.executeSearch).toBeDefined();
            expect(typeof model.executeSearch).toEqual("function");
        });
        it('isSearching should be defined', function () {
            expect(model.isSearching).toBeDefined();
            expect(typeof model.isSearching).toEqual("function");
        });
        it('reload should be defined', function () {
            expect(model.reload).toBeDefined();
            expect(typeof model.reload).toEqual("function");
        });
        it('removeFilter should be defined', function () {
            expect(model.removeFilter).toBeDefined();
            expect(typeof model.removeFilter).toEqual("function");
        });
        it('setSearchField should be defined', function () {
            expect(model.setSearchField).toBeDefined();
            expect(typeof model.setSearchField).toEqual("function");
        });
    });

    describe('Are the model methods working as expected', function () {
        it('clearFilters should work', function () {
            spyOn(model, 'executeSearch');

            model.clearFilters();
            scope.$digest();

            expect(model.executeSearch).toHaveBeenCalled();
        });
        it('executeSearch should work', function () {
            spyOn(location, 'search');

            // @todo: more work needed here.
            model.executeSearch();
            scope.$digest();

            expect(location.search).toHaveBeenCalled();
        });
        it('isSearching should work', function () {
            // @todo
            model.isSearching();
            scope.$digest();
        });
        it('reload should work', function () {
            // @todo
            model.reload();
            scope.$digest();
        });
        it('removeFilter should work', function () {
            // @todo
            model.removeFilter();
            scope.$digest();
        });
        it('setSearchField should work', function () {
            // @todo
            model.setSearchField();
            scope.$digest();
        });
    });
});
