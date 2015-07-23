(function() {
    angular.module('app.user.profile.header', [])
    .controller('UserProfileHeaderController', ['Auth', UserProfileHeaderController]);

    function UserProfileHeaderController(Auth) {
        var self = this;

        activate();

        function activate() { }
    };
})();