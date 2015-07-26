(function () {
    'use strict';

    angular.module('app',
        [
            'ngNewRouter', 'ngResource', 'mgcrea.ngStrap','app.header', 'app.navigation', 'app.home.header', 'app.home', 'app.user.profile.header', 'app.user.profile'
        ]);
})();
