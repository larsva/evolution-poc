(function() {
    angular.module('app.home', [])
    .controller('HomeController', ['Auth', 'Case', HomeController]);

    function HomeController(Auth,Case) {
        var vm = this,
            currentUser,
            latestCases,
            latestDocuments;
        vm.currentUser = Auth.getCurrentUser();
        var cases = Case.getLatestCases(vm.currentUser).query(function () {
             vm.latestCases = cases;
        });
        var documents = Case.getLatestDocuments(vm.currentUser).query(function () {
            vm.latestDocuments = documents;
        });
    }
})();