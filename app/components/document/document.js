(function () {
    angular.module('app.document', [])
        .controller('DocumentController', ['AuthMixin',DocumentController]);

    function DocumentController(AuthMixin) {
        var self = this;
        angular.extend(self, AuthMixin);
    }
})();