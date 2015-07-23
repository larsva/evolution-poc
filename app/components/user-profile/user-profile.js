(function () {
    'use strict';

    angular
        .module('app.user.profile', [])
        .controller('UserProfileController', ['Auth','User',UserProfileController]);

    function UserProfileController(Auth,User) { 
        /* jshint validthis:true */ 
        var self = this,
            data = {},
            backup = {},
            editPersonalInfo = false;

         activate();

         function activate() {
             var user = Auth.getCurrentUser();
             var profileData = User.getProfile(user, function () {
                 self.data = profileData;
             });
         }

         self.startEditPersonalInfo = function () {
             self.editPersonalInfo = true;
             self.backup = _.clone(self.data);
         }
         self.savePersonalInfo = function () {
             self.editPersonalInfo = false;
             self.backup = null;
         }

         self.cancelEditPersonalInfo = function () {
              self.data = self.backup;
             self.backup = null;
             self.editPersonalInfo = false;
         }

    }
})();
