(function() {
    angular.module('app.home.header', [])
    .controller('HomeHeaderController', ['Auth','ChangeUnit', HomeHeaderController]);

    function HomeHeaderController(Auth,ChangeUnit) {
        var self = this;

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


    }
})();