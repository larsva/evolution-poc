(function () {
    'use strict';

    angular
        .module('app')
        .factory('Auth', ['User', AuthServices]);

    function AuthServices(User) {
        var self = this;


        self.currentUserSubject = new Rx.ReplaySubject();
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

        function isAuthorized(roles) {
            return self.isAuthenticated();
        }

        function setCurrentUser(user) {
            console.log('Auth - new current user: ' + user.userId);
            self.currentUser = user;
            angular.extend(self.currentUser, {
                name: function () {
                    return this.firstName + ' ' + this.lastName;
                },

                setUnit: function (newUnit) {
                    this.unit = newUnit;
                }
            })
            self.currentUserSubject.onNext(self.currentUser);
        }

        function subscribe(subscription) {
            self.currentUserSubject.subscribe(subscription);
        }
    }

})();