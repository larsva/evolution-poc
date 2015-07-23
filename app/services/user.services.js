(function () {
    'use strict';

    angular
        .module('app')
        .factory('User', ['$resource',UserServices]);

    function UserServices($resource) {
        /* jshint validthis:true */
        var service = {
            getProfile: getProfile,
            };
        return service;

        function getProfile(user,success) {
            return $resource('data/'+user.userId + '.json', {}).get(success);
        }


    }

})();
