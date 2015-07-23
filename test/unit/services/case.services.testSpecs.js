
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


    it('should return latest cases as an array', inject(function ($injector) {
        httpLocalBackend = $injector.get('$httpBackend');
        httpLocalBackend.expectGET('data/latest-cases.json')
         .respond(200,[{
             "name": "Ärende",
             "id": "1",
             "contact": "Test",
             "created": "2015-01-12"
         }]
       );

        var latestCases = service.getLatestCases(currentUser).query();
        httpLocalBackend.flush();

        expect(latestCases.length).toBe(1);
        expect(latestCases[0].name).toBe('Ärende');
        expect(latestCases[0].id).toBe('1');
        expect(latestCases[0].contact).toBe('Test');
        expect(latestCases[0].created).toBe('2015-01-12');
    }));

});

