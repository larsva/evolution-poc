(function () {
    'use strict';

    angular
        .module('app')
        .factory('Login', ['$log','$q', '$modal', 'AUTH', LoginService]);

    function LoginService($log,$q, $modal, AUTH) {
        /* jshint validthis:true */
        var self = this;

        self.loginSubject = new Rx.Subject();

        self.service = {
            login: login,
            handleLoginResult: handleLoginResult,
            subscribe: subscribe
        };

        self.loginDialog = $modal({
            controller: "LoginController", controllerAs: 'login', templateUrl: 'components/login/login.tpl.html',
            show: false, backdrop: "static", animation: "am-fade-and-slide-top", placement: "center"
        });

        var parentShow = self.loginDialog.show;
        self.loginDialog.show = function () {
            self.deferred = $q.defer();
            parentShow();
            return self.deferred.promise;
        };

        self.showLoginDialog = function (modalDeferred) {
            self.loginDialog.$promise.then(function () {
                self.doShowLoginDialog().then(function (res) {
                        $log.info('Logged in: ' + res);
                        if (res == AUTH.AUTHENTICATED) {
                            modalDeferred.resolve();
                            self.doHideLoginDialog();
                         } else {
                            modalDeferred.reject();
                        }
                    },
                    function (res) {
                        $log.info('Rejected: ' + res);
                    })
            });
        };

        self.doShowLoginDialog = function() {
            self.loginSubject.onNext(AUTH.LOGIN_STARTED);
            return self.loginDialog.show();
        };

        self.doHideLoginDialog = function() {
            self.loginDialog.hide();
            self.loginSubject.onNext(AUTH.LOGIN_FINISHED);
        };

        return self.service;

        function login() {
            var modalDeferred = $q.defer();
            self.showLoginDialog(modalDeferred);
            return modalDeferred.promise;
        }

        function handleLoginResult(res) {
            $log.info('Login result: ' + res);
            self.deferred.resolve(res);
        }

        function subscribe(subscription) {
            self.loginSubject.subscribe(subscription);
        }

    }
})();