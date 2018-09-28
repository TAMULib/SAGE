describe('controller: ManagementController', function () {

    var controller, scope;

    beforeEach(function() {
        module('core');
        module('sage');
        module('mock.user');
        module('mock.userService');

        inject(function ($controller, $rootScope, _User_, _UserService_) {
            installPromiseMatchers();
            scope = $rootScope.$new();

            controller = $controller('ManagementController', {
                $scope: scope,
                User: _User_,
                UserService: _UserService_
            });

            // ensure that the isReady() is called.
            scope.$digest();
        });
    });

    describe('Is the controller defined', function () {
        it('should be defined', function () {
            expect(controller).toBeDefined();
        });
    });

});
