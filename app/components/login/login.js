(function () {
    'use strict';

    angular
        .module('app.user.login', [])
        .controller('Login', ['Auth','AuthMixin','AUTH',LoginController]);

    function LoginController(Auth,AuthMixin,AUTH) {
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
            AuthMixin.loginResult(isAuthenticated ? AUTH.AUTHENTICATED : AUTH.NOT_AUTHENTICATED);
        };

        self.cancelLogin = function() {
            AuthMixin.loginResult(AUTH.LOGIN_CANCELLED);
        };

        self.login = function (credentials) {
            Auth.login(credentials, self.handleLogin, self.handleLogin);

        };

        self.cancel = function () {
            self.cancelLogin();
       }

    }
})();
