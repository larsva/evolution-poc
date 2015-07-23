(function () {
    'use strict';

    angular
        .module('app')
        .factory('Case', ['$resource',CaseServices]);

    function CaseServices($resource) {
        /* jshint validthis:true */
        var service = {
            getLatestCases: getLatestCases,
            getLatestDocuments: getLatestDocuments
            };
        return service;

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
