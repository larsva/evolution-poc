
//Test suite
describe('AuthServices', function () {
    var authServices,
        expectedUser =  {
                     firstName: 'Test',
                     lastName: 'Tester',
                     unit: 'Angular',
                     name: function() {
                         return this.firstName + ' ' + this.lastName;
                     }
                 };

    beforeEach(module("app"));

    //Setup
    beforeEach(inject(function ($injector) {
        authServices = $injector.get('Auth');
        authServices.setCurrentUser(expectedUser);
    }));

    it('First name should be Test', function () {
        var theUser = authServices.getCurrentUser();
        expect(theUser.firstName).toBe(expectedUser.firstName);
    });

    it('Last name should be Tester', function () {
        var theUser = authServices.getCurrentUser();
        expect(theUser.lastName).toBe(expectedUser.lastName);
    });

    it('Department should be Angular', function () {
        var theUser = authServices.getCurrentUser();
        expect(theUser.unit).toBe(expectedUser.unit);
    });

    it('Name should be Test Tester', function () {
        var theUser = authServices.getCurrentUser();
        expect(theUser.name()).toBe(expectedUser.name());
    });

});