// Mocked Auth Service
(function () {
    angular.module('app.auth.service', []).
    factory('Auth', function () {
        /* jshint validthis:true */
        var service = { getCurrentUser: getCurrentUser};

        return service;

        function getCurrentUser() {
            return {
                firstName: 'Test',
                lastName: 'User',
                department: 'Angular dep',
                name: function () {
                    return this.firstName + ' ' + this.lastName;
                }
            };
        }

    });
})();

//Test suite
describe('AppController', function () {

    var controller;

    beforeEach(module('app'));
    beforeEach(module('app.auth.service'));

    //Setup
    beforeEach(inject(function ($controller, _Auth_) {
        controller = $controller('App', {
            'Auth': _Auth_
        });
    }));

    //Spec - 1
    it('should be initialized with current user from Auth Services', function () {

        var user = controller.currentUser;

        expect(user.firstName).toBe('Test');
        expect(user.lastName).toBe('User');
        expect(user.department).toBe('Angular dep');
        expect(user.name()).toBe('Test User');
    });


});
