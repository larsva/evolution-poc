(function () {
    'use strict';

    angular
        .module('app')
        .factory('ChangeUnit', [ChangeUnitService]);

    function ChangeUnitService() {

        var self = this,
            changedUnit,
            service = {
                startChangeUnit: startChangeUnit,
                saveUnit: saveUnit,
                cancelChangeUnit: cancelChangeUnit,
            };

        return service;

        function startChangeUnit(currentUser) {
            return currentUser.unit;
        }

        function saveUnit(currentUser, newUnit) {
            var user = currentUser;
            user.setUnit(newUnit);
        }

        function cancelChangeUnit() { }

    }

})();