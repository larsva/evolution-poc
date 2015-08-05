(function () {
    'use strict';

    angular
        .module('app')
        .factory('ChangeUnit', [ChangeUnitService]);

    function ChangeUnitService() {


        return {
            startChangeUnit: startChangeUnit,
            saveUnit: saveUnit,
            cancelChangeUnit: cancelChangeUnit,
        };

        function startChangeUnit(currentUser) {
            return currentUser.unit;
        }

        function saveUnit(currentUser, newUnit) {
            var user = currentUser;
            user.setUnit(newUnit);
        }

        function cancelChangeUnit() {
        }

    }

})();