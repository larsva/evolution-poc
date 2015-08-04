(function () {
    'use strict';

    angular
        .module('app.user.login', [])
        .controller('Login', ['Auth','AuthMixin',LoginController]);

    function LoginController(Auth,AuthMixin) {
        /* jshint validthis:true */
        var self = this;

        self.credentials = {
            userId: '',
            password: ''
        };

        self.handleLogin = function() {
            AuthMixin.loginResult(Auth.isAuthenticated());
        }

        self.cancelLogin = function() {
            AuthMixin.loginResult(false);
        }

        self.login = function (credentials) {
            Auth.login(credentials, self.handleLogin, self.cancelLogin);

        }

        self.cancel = function () {
            self.cancelLogin();
       }

    }
})();
