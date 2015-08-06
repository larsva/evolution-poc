(function () {
    'use strict';

    angular
        .module('app')
        .factory('Document', ['$resource', DocumentService]);

    function DocumentService($resource) {
        /* jshint validthis:true */
        return {
            getLastOpenedDocuments: getLastOpenedDocuments
        };

        //noinspection JSUnusedLocalSymbols
        function getLastOpenedDocuments(user) {
            return $resource('data/last-opened-documents.json', {}, {
                query: {method: 'GET', params: {}, isArray: true}
            });
        }
    }

})();
