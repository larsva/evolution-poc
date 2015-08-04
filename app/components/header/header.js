(function () {
    angular.module('app.header', ['mgcrea.ngStrap'])
        .controller('HeaderController', [HeaderController]);
    function HeaderController(Base) {
        var self = this;

        self.profilePopover = {
            templateUrl: 'components/header/profile-popover.html'
        }

    };
})();