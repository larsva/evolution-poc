(function () {
    'use strict';

    angular.module('app',
        [
            'ngNewRouter', 'ngResource', 'app.header', 'app.navigation', 'app.home.header', 'app.home', 'app.user.profile.header', 'app.user.profile'
        ]);
})();

(function () {
    'use strict';

    angular
        .module('app')
        .factory('Auth', [AuthServices]);

    function AuthServices() {

        var self = this,
            service = {
                getCurrentUser: getCurrentUser,
                setCurrentUser: setCurrentUser
            };

        self.currentUser = {
            userId: 'urtu',
            firstName: 'Urban',
            lastName: 'Turban',
            unit: { name: 'Skolkontoret' },
            units: [{ name: 'Skolkontoret' }, { name: 'Kommunstyrelsen' }, { name: 'Socialförvaltningen' }],

            name: function () {
                return this.firstName + ' ' + this.lastName;
            },

            setUnit: function(newUnit) {
                this.unit = newUnit;
            }
        };

        return service;

        function getCurrentUser() { 
            return self.currentUser;
        }

        function setCurrentUser(user) {
            self.currentUser = user;
        }
    }

})();
(function () {
    'use strict';

    angular
        .module('app')
        .factory('Case', ['$resource',CaseServices]);

    function CaseServices($resource) {
        /* jshint validthis:true */
        var service = {
            getLatestCases: getLatestCases,
            getLatestDocuments: getLatestDocuments
            };
        return service;

        function getLatestCases(user) {
            return $resource('data/latest-cases.json', {}, {
                query: {method:'GET', params:{}, isArray:true}
            });
        }

        function getLatestDocuments(user) {
            return $resource('data/latest-documents.json', {}, {
                query: { method: 'GET', params: {}, isArray: true }
            });
        }
    }

})();

(function () {
    'use strict';

    angular
        .module('app')
        .factory('User', ['$resource',UserServices]);

    function UserServices($resource) {
        /* jshint validthis:true */
        var service = {
            getProfile: getProfile,
            };
        return service;

        function getProfile(user,success) {
            return $resource('data/'+user.userId + '.json', {}).get(success);
        }


    }

})();

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

(function () {
    angular.module('app.header', [])
    .controller('HeaderController', [
        function () { }]); 
})();
(function() {
    angular.module('app.home.header', [])
    .controller('HomeHeaderController', ['Auth','ChangeUnit', HomeHeaderController]);

    function HomeHeaderController(Auth,ChangeUnit) {
        var self = this,
            changedUnit,
            changeUnitMode = false; 

        self.startChangeUnit = function() {
            self.changedUnit = ChangeUnit.startChangeUnit(Auth.getCurrentUser());
            self.changeUnitMode = true;
        }

        self.saveUnit = function () {
            ChangeUnit.saveUnit(Auth.getCurrentUser(), self.changedUnit);
            self.changeUnitMode = false;
        }

        self.cancelChangeUnit = function () {
            ChangeUnit.cancelChangeUnit();
            self.changeUnitMode = false;
        }

    };
})();
(function() {
    angular.module('app.home', [])
    .controller('HomeController', ['Auth', 'Case', HomeController]);

    function HomeController(Auth,Case) {
        var vm = this,
            currentUser,
            latestCases,
            latestDocuments;
        vm.currentUser = Auth.getCurrentUser();
        var cases = Case.getLatestCases(vm.currentUser).query(function () {
             vm.latestCases = cases;
        });
        var documents = Case.getLatestDocuments(vm.currentUser).query(function () {
            vm.latestDocuments = documents;
        });
    }
})();
(function () {
    'use strict';

    angular
        .module('app.navigation', [])
        .controller('NavigationController', ['Auth', 'ChangeUnit', NavigationController]);

    function NavigationController(Auth, ChangeUnit) {
        /* jshint validthis:true */
        var self = this,
            changedUnit,
            changeUnitMode = false;

        activate();

        function activate() { }

        self.startChangeUnit = function () {
            self.changedUnit = ChangeUnit.startChangeUnit(Auth.getCurrentUser());
            self.changeUnitMode = true;
        }

        self.saveUnit = function () {
            ChangeUnit.saveUnit(Auth.getCurrentUser(),self.changedUnit);
            self.changeUnitMode = false;
        }

        self.cancelChangeUnit = function () {
            ChangeUnit.cancelChangeUnit();
            self.changeUnitMode = false;
        }
    }

})();

(function() {
    angular.module('app.user.profile.header', [])
    .controller('UserProfileHeaderController', ['Auth', UserProfileHeaderController]);

    function UserProfileHeaderController(Auth) {
        var self = this;

        activate();

        function activate() { }
    };
})();
(function () {
    'use strict';

    angular
        .module('app.user.profile', [])
        .controller('UserProfileController', ['Auth','User',UserProfileController]);

    function UserProfileController(Auth,User) { 
        /* jshint validthis:true */ 
        var self = this,
            data = {},
            backup = {},
            editPersonalInfo = false;

         activate();

         function activate() {
             var user = Auth.getCurrentUser();
             var profileData = User.getProfile(user, function () {
                 self.data = profileData;
             });
         }

         self.startEditPersonalInfo = function () {
             self.editPersonalInfo = true;
             self.backup = _.clone(self.data);
         }
         self.savePersonalInfo = function () {
             self.editPersonalInfo = false;
             self.backup = null;
         }

         self.cancelEditPersonalInfo = function () {
              self.data = self.backup;
             self.backup = null;
             self.editPersonalInfo = false;
         }

    }
})();

(function () {
    'use strict';

    angular
        .module('app')
        .factory('ChangeUnit', [ChangeUnitService]);

    function ChangeUnitService() {

        var self = this,
            changedUnit,
            service = {
                startChangeUnit: startChangeUnit,
                saveUnit: saveUnit,
                cancelChangeUnit: cancelChangeUnit,
            };

        return service;

        function startChangeUnit(currentUser) {
            return currentUser.unit;
        }

        function saveUnit(currentUser, newUnit) {
            var user = currentUser;
            user.setUnit(newUnit);
        }

        function cancelChangeUnit() { }

    }

})();