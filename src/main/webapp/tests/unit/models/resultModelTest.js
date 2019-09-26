describe('model: Result', function () {
    var model, rootScope, scope, location, WsApi;

    var initializeVariables = function(settings) {
        inject(function ($location, $rootScope, _WsApi_) {
            location = $location;
            rootScope = $rootScope;

            WsApi = _WsApi_;
        });
    };

    var initializeModel = function(settings) {
        inject(function (Result) {
            scope = rootScope.$new();

            model = angular.extend(new Result(), dataResult1);
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
});
