﻿(function () {
    'use strict';

    angular
        .module('app')
        .config(function($modalProvider) {
            angular.extend($modalProvider.defaults, {
                html: true
            });
        })
        .controller('App', ['$log','$location','$modal','$router','Auth','AUTH','Login',AppController]);

    function AppController($log,$location,$modal,$router, Auth,AUTH,Login) {
        var self = this;

        self.hideContent = false;

        $router.config([
            {path: '/', redirectTo:'/home'},
            {
                path: '/home',
                components: {
                    'header': 'header',
                    'navigation': 'navigation',
                    'content': 'home'
                }, as: 'home'
            },
            {
                path: '/userProfile',
                components: {
                    'header': 'header',
                    'navigation': 'navigation',
                    'content': 'userProfile'
                } , as: 'user-profile'
            },
            {
                path: '/document',
                components: {
                    'header': 'header',
                    'navigation': 'navigation',
                    'content': 'document'
                }, as: 'document'
            }]);

        self.currentUser = Auth.getCurrentUser();

        Auth.subscribe(function(user) {
            self.currentUser = user;
            $log.info('AppController - new current user:' + (self.currentUser != null ? self.currentUser.userId : 'null'));
        });

        Login.subscribe(function(state) {
            self.hideContent = AUTH.LOGIN_STARTED === state;
         });

        self.settingsModal = $modal({controller: "Settings",controllerAs: 'settings', templateUrl: 'components/settings/settings.tpl.html', show: false});
        self.showSettingsModal = function() {
            self.settingsModal.$promise.then(self.settingsModal.show);
        };
        self.hideSettingsModal = function() {
            self.settingsModal.$promise.then(self.settingsModal.hide);
        };

        self.logout = function() {
             Auth.logout();
             var path = $location.path();
             if ('/home' === path) {
                 $router.renavigate();
             } else {
                 $location.path('/home');
             }
         };

        self.hsAuthenticatedUser = function() {
            return Auth.isAuthenticated();
        }
    }

})();