
//Test suite
describe('DocumentServices', function () {
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
        service = $injector.get('Document');
    }));


    it('should return last opened documents', inject(function ($injector) {
        httpLocalBackend = $injector.get('$httpBackend');
        httpLocalBackend.expectGET('data/last-opened-documents.json')
         .respond(200,[{
            "name": "Dokument 2",
            "id": "KS 2015/23",
            "contact": "Nathan Fillion",
            "date": "2015-03-12"
         }]
       );

        var getLastOpenedCases = service.getLastOpenedDocuments(currentUser).query();
        httpLocalBackend.flush();

        expect(getLastOpenedCases.length).toBe(1);
        expect(getLastOpenedCases[0].name).toBe('Dokument 2');
        expect(getLastOpenedCases[0].id).toBe('KS 2015/23');
        expect(getLastOpenedCases[0].contact).toBe('Nathan Fillion');
        expect(getLastOpenedCases[0].date).toBe('2015-03-12');
    }));

});

