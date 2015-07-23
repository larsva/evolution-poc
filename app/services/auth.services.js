(function () {
    'use strict';

    angular
        .module('app')
        .factory('Auth', [AuthServices]);

    function AuthServices() {

        var self = this,
            service = {
                getCurrentUser: getCurrentUser,
                setCurrentUser: setCurrentUser
            };

        self.currentUser = {
            userId: 'urtu',
            firstName: 'Urban',
            lastName: 'Turban',
            unit: { name: 'Skolkontoret' },
            units: [{ name: 'Skolkontoret' }, { name: 'Kommunstyrelsen' }, { name: 'Socialförvaltningen' }],

            name: function () {
                return this.firstName + ' ' + this.lastName;
            },

            setUnit: function(newUnit) {
                this.unit = newUnit;
            }
        };

        return service;

        function getCurrentUser() { 
            return self.currentUser;
        }

        function setCurrentUser(user) {
            self.currentUser = user;
        }
    }

})();