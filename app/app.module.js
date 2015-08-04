(function () {
    'use strict';

    angular.module('app',
        [
            'ngNewRouter', 'ngResource', 'ngAnimate','mgcrea.ngStrap','app.user.login', 'app.header', 'app.navigation', 'app.home.header', 'app.home', 'app.user.profile.header', 'app.user.profile','app.settings'
        ]);
})();
