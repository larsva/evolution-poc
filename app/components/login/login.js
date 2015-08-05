(function () {
    'use strict';

    angular
        .module('app.user.login', [])
        .controller('LoginController', ['Auth','Login','AUTH',LoginController]);

    function LoginController(Auth,Login,AUTH) {
        /* jshint validthis:true */
        var self = this;

        self.errorMessage = '';
        self.credentials = {
            userId: '',
            password: ''
        };

        self.handleLogin = function() {
            var isAuthenticated = Auth.isAuthenticated();
            if (!isAuthenticated) {
                self.errorMessage = 'Ogiltigt användarnamn och/eller lösenord';
            }
           Login.handleLoginResult(isAuthenticated ? AUTH.AUTHENTICATED : AUTH.NOT_AUTHENTICATED);
        };

        self.cancelLogin = function() {
            Login.handleLoginResult(AUTH.LOGIN_CANCELLED);
        };

        self.login = function (credentials) {
            Auth.login(credentials, self.handleLogin, self.handleLogin);

        };

        self.cancel = function () {
            self.cancelLogin();
       }

    }
})();
