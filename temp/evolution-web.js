(function () {
    'use strict';

    angular.module('app',
        [
            'ngNewRouter', 'ngResource', 'ngAnimate','mgcrea.ngStrap','app.user.login', 'app.header', 'app.navigation', 'app.home.header', 'app.home', 'app.user.profile.header', 'app.user.profile','app.settings'
        ]);
})();

(function () {
    'use strict';

    angular
        .module('app')
        .service('AuthMixin', ['$q','$location','$modal','Auth',AuthMixinServices]);

    function AuthMixinServices($q,$location,$modal,Auth) {
        /* jshint validthis:true */
        var self = this;

        self.service = {
            loginResult: loginResult,
            canActivate: canActivate,
            activate: activate
          };

        self.loginModal = $modal({controller: "Login",controllerAs: 'login', templateUrl: 'components/login/login.tpl.html',
                                  show: false, backdrop:"static", animation:"am-fade-and-slide-top",placement:"center"});

        var parentShow = self.loginModal.show;
        self.loginModal.show = function() {
            self.deferred = $q.defer();
            parentShow();
            return self.deferred.promise;
        };

        self.showLoginModal = function (modalDeferred) {
            self.loginModal.$promise.then(function () {
                self.loginModal.show().then(function(res) {
                    console.log('Logged in: ' + res);
                    if (res == 'authenticated') {
                        modalDeferred.resolve();
                        self.loginModal.hide();
                    } else {
                        modalDeferred.reject();
                    }
                 },
                function(res) {
                    console.log('Rejected: ' + res);
                })});
        };


        return self.service;

        function canActivate() {
            console.log('Can activate route change to: ' + $location.path() + '?');
            var authenticated = Auth.isAuthenticated();
            if (!authenticated) {
                var modalDeferred = $q.defer();
                self.showLoginModal(modalDeferred);
                return modalDeferred.promise;
            }
            return true;
        };

        function loginResult(res) {
            console.log('Login result: ' + res);
            self.deferred.resolve(res);
        };

        function activate() {
            console.log("Activate " + $location.path());
        }
    }
})();

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

        function logout(userId) {
            self.currentUser = null;
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
                getUser: getUser,
                getSettings: getSettings,
        };

        return service;

        function getUser(userId,success,failure) {
            return $resource('data/'+ userId + '.json', {}).get(success,failure);
        }

        function getSettings(user,success) {
           return $resource('data/'+user.userId + '-settings.json', {}).get(success);
        }
    }

})();

(function () {
    'use strict';

    angular
        .module('app')
        .config(function($modalProvider) {
            angular.extend($modalProvider.defaults, {
                html: true
            });
        })
        .controller('App', ['$modal','$router','Auth',AppController]);

    function AppController($modal,$router, Auth) {
        var self = this;

        $router.config([
            {path: '/', redirectTo:'/home'},
            {
                path: '/home',
                components: {
                    'header': 'header',
                    'sidebar': 'navigation',
                    'content-header': 'homeHeader',
                    'content': 'home'
                }
            },
            {
                path: '/userProfile',
                components: {
                    'header': 'header',
                    'sidebar': 'navigation',
                    'content-header': 'userProfileHeader',
                    'content': 'userProfile'
                }
            }]);

        self.currentUser = Auth.getCurrentUser();

        Auth.subscribe(function(user) {
            self.currentUser = user;
            console.log('AppController - new current user:' + self.currentUser.userId);
        });

        self.settingsModal = $modal({controller: "Settings",controllerAs: 'settings', templateUrl: 'components/settings/settings.tpl.html', show: false});
        self.showSettingsModal = function() {
            self.settingsModal.$promise.then(self.settingsModal.show);
        };
        self.hideSettingsModal = function() {
            self.settingsModal.$promise.then(self.settingsModal.hide);
        };


    }

})();
(function () {
    angular.module('app.header', ['mgcrea.ngStrap'])
        .controller('HeaderController', [HeaderController]);
    function HeaderController(Base,AuthMixin) {
        var self = this;

        self.profilePopover = {
            templateUrl: 'components/header/profile-popover.html'
        }

    };
})();
(function() {
    angular.module('app.home.header', [])
    .controller('HomeHeaderController', ['Auth','ChangeUnit', HomeHeaderController]);

    function HomeHeaderController(Auth,ChangeUnit) {
        var self = this;

        self.startChangeUnit = function() {
            self.changedUnit = ChangeUnit.startChangeUnit(Auth.getCurrentUser());
            self.changeUnitMode = true;
        };

        self.saveUnit = function () {
            ChangeUnit.saveUnit(Auth.getCurrentUser(), self.changedUnit);
            self.changeUnitMode = false;
        };

        self.cancelChangeUnit = function () {
            ChangeUnit.cancelChangeUnit();
            self.changeUnitMode = false;
        };


    }
})();
(function() {
    angular.module('app.home', [])
    .controller('HomeController', ['Auth', 'Case', 'AuthMixin',HomeController]);

    function HomeController(Auth,Case,AuthMixin) {
        var self = this;

        self.currentUser = Auth.getCurrentUser();
        var cases = Case.getLatestCases(self.currentUser).query(function () {
             self.latestCases = cases;
        });
        var documents = Case.getLatestDocuments(self.currentUser).query(function () {
            self.latestDocuments = documents;
        });

        angular.extend(self,AuthMixin);
     }
})();
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

(function () {
    'use strict';

    angular
        .module('app.navigation', [])
        .controller('NavigationController', ['Auth', 'ChangeUnit',NavigationController]);

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
    angular.module('app.settings', [])
        .controller('Settings', ['Auth','User',SettingsController]);

    function SettingsController(Auth,User) {
        var self = this;

        self.title = 'Settings';

        var temp = User.getSettings(Auth.getCurrentUser(), function() {
            self.settingsModel = temp;
        });

    };

})();
(function() {
    angular.module('app.user.profile.header', [])
    .controller('UserProfileHeaderController', ['Auth', UserProfileHeaderController]);

    function UserProfileHeaderController() {
    };
})();
(function () {
    'use strict';

    angular
        .module('app.user.profile', [])
        .controller('UserProfileController', ['Auth', 'User', 'AuthMixin', UserProfileController]);

    function UserProfileController(Auth, User, AuthMixin) {
        /* jshint validthis:true */
        var self = this;

        self.data = {};
        self.backup = {};
        self.editPersonalInfo = false;
        angular.extend(self, AuthMixin);


        self.getUserProfile = function () {
            var user = Auth.getCurrentUser();
            if (user) {
                console.log('UserProfile - current user: ' + user.userId);
                var profileData = User.getUser(user.userId,
                            function () {
                                console.log('Read profile data for ' + profileData.userId);
                                self.data = profileData;
                            },
                            function() {
                                console.log('Unable to read profile data for ' + user.userId);
                            });
                } else {
                console.log('UserProfile - current user undefined.');
            }
        }


        self.activate = function() {
            self.getUserProfile();
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