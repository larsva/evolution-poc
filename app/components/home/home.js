(function() {
    angular.module('app.home', [])
    .controller('HomeController', ['Auth', 'Case','Document', 'AuthMixin','ChangeUnit',HomeController]);

    function HomeController(Auth,Case,Document,AuthMixin,ChangeUnit) {
        var self = this;

        self.currentUser = Auth.getCurrentUser();
        var cases = Case.getLastOpenedCases(self.currentUser).query(function () {
             self.lastOpenedCases = cases;
        });
        var documents = Document.getLastOpenedDocuments(self.currentUser).query(function () {
            self.lastOpenedDocuments = documents;
        });

        self.startChangeUnit = function() {
            self.changedUnit = ChangeUnit.startChangeUnit(Auth.getCurrentUser());
            self.changeUnitMode = true;
        };

        self.saveUnit = function () {
            ChangeUnit.saveUnit(Auth.getCurrentUser(), self.changedUnit);
            self.changeUnitMode = false;
        };

        self.cancelChangeUnit = function () {
            ChangeUnit.cancelChangeUnit();
            self.changeUnitMode = false;
        };

        angular.extend(self,AuthMixin);
     }
})();