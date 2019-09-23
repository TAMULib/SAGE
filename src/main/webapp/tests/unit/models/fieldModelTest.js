describe('model: Field', function () {
    var model, rootScope, scope, location, WsApi;

    var initializeVariables = function(settings) {
        inject(function ($location, $rootScope, _WsApi_) {
            location = $location;
            rootScope = $rootScope;

            WsApi = _WsApi_;
        });
    };

    var initializeModel = function(settings) {
        inject(function (Field) {
            scope = rootScope.$new();

            model = angular.extend(new Field(), dataField1);
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
