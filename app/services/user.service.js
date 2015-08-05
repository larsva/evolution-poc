(function () {
    'use strict';

    angular
        .module('app')
        .factory('User', ['$resource', UserService]);

    function UserService($resource) {
        /* jshint validthis:true */
        return {
            getUser: getUser,
            getSettings: getSettings
        };


        function getUser(userId, success, failure) {
            return $resource('data/' + userId + '.json', {}).get(success, failure);
        }

        function getSettings(user, success) {
            return $resource('data/' + user.userId + '-settings.json', {}).get(success);
        }
    }

})();
