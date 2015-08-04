(function () {
    'use strict';

    angular
        .module('app')
        .service('AuthMixin', ['$q','$location','$modal','Auth',AuthMixinServices]);

    function AuthMixinServices($q,$location,$modal,Auth) {
        /* jshint validthis:true */
        var self = this;

        self.service = {
            loginResult: loginResult,
            canActivate: canActivate,
            activate: activate,
         };

        self.loginModal = $modal({controller: "Login",controllerAs: 'login', templateUrl: 'components/login/login.tpl.html',
                                  show: false, backdrop:"static", animation:"am-fade-and-slide-top",placement:"center"});

        var parentShow = self.loginModal.show;
        self.loginModal.show = function() {
            self.deferred = $q.defer();
            parentShow();
            return self.deferred.promise;
        };

        self.showLoginModal = function (modalDeferred) {
            self.loginModal.$promise.then(function () {
                self.loginModal.show().then(function(res) {
                    console.log('Logged in: ' + res);
                    if (res) {
                        modalDeferred.resolve();
                    } else {
                        modalDeferred.reject();
                    }
                 })});
        };

        return self.service;


        function canActivate() {
            console.log('Can activate route change to: ' + $location.path() + '?')
            var authenticated = Auth.isAuthenticated();
            if (!authenticated) {
                var modalDeferred = $q.defer();
                self.showLoginModal(modalDeferred);
                return modalDeferred.promise;
            }
            return true;
        };

        function loginResult(res) {
            console.log('Login result: ' + res);
            self.deferred.resolve(res);
            self.loginModal.hide();
        };

        function activate() {
            console.log("Activate " + $location.path());
        }
    }
})();
