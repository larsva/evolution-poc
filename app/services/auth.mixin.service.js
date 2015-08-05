/**
 * Mixin service class that is injected in all component controllers where
 * the user needs to be authenticated to access.
 *
 * If the user is not authenticated, i.e. current user is null, then
 * a login dialog is shown.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .service('AuthMixin', ['$location','Auth','Login',AuthMixinService]);

    function AuthMixinService($location,Auth,Login) {
        /* jshint validthis:true */
        var self = this;


        self.service = {
            canActivate: canActivate,
            activate: activate
          };

        return self.service;

        function canActivate() {
            console.log('Can activate route change to: ' + $location.path() + '?');
            var authenticated = Auth.isAuthenticated();
            if (!authenticated) {
                 return Login.login();
            }
            console.log('Activate route change to: ' + $location.path());
            return true;
        }

        function activate() {
            console.log("Activate " + $location.path());
        }
    }
})();
