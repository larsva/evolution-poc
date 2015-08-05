(function () {
    'use strict';

    angular
        .module('app')
        .service('AuthMixin', ['$location','Auth','Login',AuthMixinServices]);

    function AuthMixinServices($location,Auth,Login) {
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
            return true;
        };

        function activate() {
            console.log("Activate " + $location.path());
        }
    }
})();
