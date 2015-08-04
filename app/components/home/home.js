(function() {
    angular.module('app.home', [])
    .controller('HomeController', ['Auth', 'Case', 'AuthMixin',HomeController]);

    function HomeController(Auth,Case,AuthMixin) {
        var self = this;

        self.currentUser = Auth.getCurrentUser();
        var cases = Case.getLatestCases(self.currentUser).query(function () {
             self.latestCases = cases;
        });
        var documents = Case.getLatestDocuments(self.currentUser).query(function () {
            self.latestDocuments = documents;
        });

        angular.extend(self,AuthMixin);
     }
})();