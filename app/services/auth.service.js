(function () {
    'use strict';

    angular
        .module('app')
        .constant('AUTH', {
            AUTHENTICATED: 'authenticated',
            NOT_AUTHENTICATED: 'not_authenticated',
            LOGIN_CANCELLED: 'login_cancelled',
            LOGIN_STARTED: 'login_started',
            LOGIN_FINISHED: 'login_finished'
        })
        .factory('Auth', ['$log','User', AuthService]);

    function AuthService($log,User) {
        var self = this;


        self.currentUserSubject = new Rx.Subject();
        self.service = {
            login: login,
            logout: logout,
            isAuthenticated: isAuthenticated,
            isAuthorized: isAuthorized,
            getCurrentUser: getCurrentUser,
            setCurrentUser: setCurrentUser,
            subscribe: subscribe
        };


        return self.service;

        function login(credentials,success,failure) {
            var userProfile = User.getUser(credentials.userId, function () {
                self.service.setCurrentUser(userProfile);
                success();
             }, function () {
                self.currentUser = null;
                failure();
            });
        }

        function logout() {
            self.currentUser = null;
            self.currentUserSubject.onNext(self.currentUser);
        }

        function getCurrentUser() {
            return self.currentUser;
        }

        function isAuthenticated() {
            return self.currentUser != null;
        }

        //noinspection JSUnusedLocalSymbols
        function isAuthorized(roles) {
            return self.isAuthenticated();
        }

        function setCurrentUser(user) {
            $log.info('Auth - new current user: ' + user.userId);
            self.currentUser = user;
            angular.extend(self.currentUser, {
                name: function () {
                    return this.firstName + ' ' + this.lastName;
                },

                setUnit: function (newUnit) {
                    this.unit = newUnit;
                }
            });
            self.currentUserSubject.onNext(self.currentUser);
        }

        function subscribe(subscription) {
            return self.currentUserSubject.subscribe(subscription);
        }
    }

})();