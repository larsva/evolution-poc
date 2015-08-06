(function () {
    'use strict';

    angular
        .module('app')
        .factory('Case', ['$resource', CaseService]);

    function CaseService($resource) {
        /* jshint validthis:true */
        return {
            getLastOpenedCases: getLastOpenedCases
         };

        //noinspection JSUnusedLocalSymbols
        function getLastOpenedCases(user) {
            return $resource('data/last-opened-cases.json', {}, {
                query: {method: 'GET', params: {}, isArray: true}
            });
        }

     }

})();
