(function () {
    angular.module('app.header', ['mgcrea.ngStrap'])
        .controller('HeaderController', [HeaderController]);
    function HeaderController(Base,AuthMixin) {
        var self = this;

        self.profilePopover = {
            templateUrl: 'components/header/profile-popover.html'
        }

    };
})();