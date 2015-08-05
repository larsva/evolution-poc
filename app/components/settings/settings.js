(function() {
    angular.module('app.settings', [])
        .controller('Settings', ['Auth','User',SettingsController]);

    function SettingsController(Auth,User) {
        var self = this;

        self.title = 'Settings';

        var temp = User.getSettings(Auth.getCurrentUser(), function() {
            self.settingsModel = temp;
        });

    }

})();