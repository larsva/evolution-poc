(function () {
    'use strict';

    angular
        .module('app.user.profile', [])
        .controller('UserProfileController', ['Auth', 'User', 'AuthMixin', UserProfileController]);

    function UserProfileController(Auth, User, AuthMixin) {
        /* jshint validthis:true */
        var self = this;

        self.data = {};
        self.backup = {};
        self.editPersonalInfo = false;
        angular.extend(self, AuthMixin);


        self.getUserProfile = function () {
            var user = Auth.getCurrentUser();
            if (user) {
                console.log('UserProfile - current user: ' + user.userId);
                var profileData = User.getUser(user.userId,
                            function () {
                                console.log('Read profile data for ' + profileData.userId);
                                self.data = profileData;
                            },
                            function() {
                                console.log('Unable to read profile data for ' + user.userId);
                            });
                } else {
                console.log('UserProfile - current user undefined.');
            }
        };


        self.activate = function() {
            AuthMixin.activate();
            self.getUserProfile();
        };

        self.startEditPersonalInfo = function () {
            self.editPersonalInfo = true;
            self.backup = _.clone(self.data);
        };

        self.savePersonalInfo = function () {
            self.editPersonalInfo = false;
            self.backup = null;
        };

        self.cancelEditPersonalInfo = function () {
            self.data = self.backup;
            self.backup = null;
            self.editPersonalInfo = false;
        };

    }
})();
