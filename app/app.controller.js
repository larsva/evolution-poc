(function () {
    'use strict';

    angular
        .module('app')
        .config(function($modalProvider) {
            angular.extend($modalProvider.defaults, {
                html: true
            });
        })
        .controller('App', ['$modal','$router','Auth',AppController]);

    function AppController($modal,$router, Auth) {
        var self = this;

        $router.config([
            {path: '/', redirectTo:'/home'},
            {
                path: '/home',
                components: {
                    'header': 'header',
                    'sidebar': 'navigation',
                    'content-header': 'homeHeader',
                    'content': 'home'
                }
            },
            {
                path: '/userProfile',
                components: {
                    'header': 'header',
                    'sidebar': 'navigation',
                    'content-header': 'userProfileHeader',
                    'content': 'userProfile'
                }
            }]);

        self.currentUser = Auth.getCurrentUser();

        Auth.subscribe(function(user) {
            self.currentUser = user;
            console.log('AppController - new current user:' + self.currentUser.userId);
        });

        self.settingsModal = $modal({controller: "Settings",controllerAs: 'settings', templateUrl: 'components/settings/settings.tpl.html', show: false});
        self.showSettingsModal = function() {
            self.settingsModal.$promise.then(self.settingsModal.show);
        };
        self.hideSettingsModal = function() {
            self.settingsModal.$promise.then(self.settingsModal.hide);
        };


    }

})();