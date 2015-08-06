
//Test suite
describe('CaseServices', function () {
    var service,
        httpLocalBackend,
        currentUser =  {
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
        service = $injector.get('Case');
    }));


    it('should return last opened cases as an array', inject(function ($injector) {
        httpLocalBackend = $injector.get('$httpBackend');
        httpLocalBackend.expectGET('data/last-opened-cases.json')
         .respond(200,[{
             "name": "Ärende",
             "id": "1",
             "contact": "Test",
             "created": "2015-01-12"
         }]
       );

        var getLastOpenedCases = service.getLastOpenedCases(currentUser).query();
        httpLocalBackend.flush();

        expect(getLastOpenedCases.length).toBe(1);
        expect(getLastOpenedCases[0].name).toBe('Ärende');
        expect(getLastOpenedCases[0].id).toBe('1');
        expect(getLastOpenedCases[0].contact).toBe('Test');
        expect(getLastOpenedCases[0].created).toBe('2015-01-12');
    }));

});

