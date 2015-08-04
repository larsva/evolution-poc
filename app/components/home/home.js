(function() {
    angular.module('app.home', [])
    .controller('HomeController', ['Auth', 'Case', 'AuthMixin','ChangeUnit',HomeController]);

    function HomeController(Auth,Case,AuthMixin,ChangeUnit) {
        var self = this;

        self.currentUser = Auth.getCurrentUser();
        var cases = Case.getLatestCases(self.currentUser).query(function () {
             self.latestCases = cases;
        });
        var documents = Case.getLatestDocuments(self.currentUser).query(function () {
            self.latestDocuments = documents;
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