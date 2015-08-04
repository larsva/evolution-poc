(function() {
    angular.module('app.home.header', [])
    .controller('HomeHeaderController', ['Auth','ChangeUnit', 'AuthMixin',HomeHeaderController]);

    function HomeHeaderController(Auth,ChangeUnit,AuthMixin) {
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

 //       angular.extend(self, AuthMixin.activate);

    };
})();