
(function () {
    angular.module('app.header', ['mgcrea.ngStrap'])
    .controller('HeaderController', [
        function () {
            var self= this;

            self.profilePopover = {
                templateUrl: 'components/header/profile-popover.html'
             }
        }]);
})();