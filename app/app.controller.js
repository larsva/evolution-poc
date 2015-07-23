(function () {
    'use strict';

    angular
        .module('app')
        .controller('App', ['$router','Auth',AppController]);

    function AppController($router, Auth) {
        var self = this,
            currentUser; 

        $router.config([
            {path: '/', redirectTo:'/home'},
            { path: '/home', components:{
                'header': 'header',
                'sidebar': 'navigation',
                'content-header': 'homeHeader',
                'content': 'home'
                }
            },
            {
                path: '/userProfile', components: {
                    'header': 'header',
                    'sidebar': 'navigation',
                    'content-header': 'userProfileHeader',
                    'content': 'userProfile'
                }
            }]);

        self.currentUser = Auth.getCurrentUser();
        console.log('AppController.currentUser:' + self.currentUser);
    }

})();