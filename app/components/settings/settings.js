(function() {
    angular.module('app.settings', [])
        .controller('SettingsController', [SettingsController]);

    function SettingsController() {
        var self = this;

        self.title = 'Settings';

    };

})();