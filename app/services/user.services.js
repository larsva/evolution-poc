(function () {
    'use strict';

    angular
        .module('app')
        .factory('User', ['$resource',UserServices]);

    function UserServices($resource) {
        /* jshint validthis:true */
        var service = {
                getUser: getUser,
                getSettings: getSettings,
        };

        return service;

        function getUser(userId,success,failure) {
            return $resource('data/'+ userId + '.json', {}).get(success,failure);
        }

        function getSettings(user,success) {
           return $resource('data/'+user.userId + '-settings.json', {}).get(success);
        }
    }

})();
