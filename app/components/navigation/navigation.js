(function () {
    'use strict';

    angular
        .module('app.navigation', [])
        .controller('NavigationController', ['Auth', 'ChangeUnit', NavigationController]);

    function NavigationController(Auth, ChangeUnit) {
        /* jshint validthis:true */
        var self = this,
            changedUnit,
            changeUnitMode = false;

        activate();

        function activate() { }

        self.startChangeUnit = function () {
            self.changedUnit = ChangeUnit.startChangeUnit(Auth.getCurrentUser());
            self.changeUnitMode = true;
        }

        self.saveUnit = function () {
            ChangeUnit.saveUnit(Auth.getCurrentUser(),self.changedUnit);
            self.changeUnitMode = false;
        }

        self.cancelChangeUnit = function () {
            ChangeUnit.cancelChangeUnit();
            self.changeUnitMode = false;
        }
    }

})();
