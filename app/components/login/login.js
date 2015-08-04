(function () {
    'use strict';

    angular
        .module('app.user.login', [])
        .controller('Login', ['Auth','AuthMixin',LoginController]);

    function LoginController(Auth,AuthMixin) {
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
            AuthMixin.loginResult(isAuthenticated ? 'authenticated' : 'not_authenticated');
        };

        self.cancelLogin = function() {
            AuthMixin.loginResult('cancel');
        };

        self.login = function (credentials) {
            Auth.login(credentials, self.handleLogin, self.handleLogin);

        };

        self.cancel = function () {
            self.cancelLogin();
       }

    }
})();
