(function () {
    'use strict';

    angular
        .module('app')
        .factory('Case', ['$resource',CaseService]);

    function CaseService($resource) {
        /* jshint validthis:true */
         return {
            getLatestCases: getLatestCases,
            getLatestDocuments: getLatestDocuments
        };

        function getLatestCases(user) {
            return $resource('data/latest-cases.json', {}, {
                query: {method:'GET', params:{}, isArray:true}
            });
        }

        function getLatestDocuments(user) {
            return $resource('data/latest-documents.json', {}, {
                query: { method: 'GET', params: {}, isArray: true }
            });
        }
    }

})();
