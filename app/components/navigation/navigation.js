(function () {
    'use strict';

    angular
        .module('app.navigation', [])
        .controller('NavigationController', ['Auth', 'ChangeUnit',NavigationController]);

    function NavigationController($scope,Auth, ChangeUnit) {
        /* jshint validthis:true */
        var self = this;

        self.changeUnitMode = false;

        self.startChangeUnit = function () {
            self.changedUnit = ChangeUnit.startChangeUnit(Auth.getCurrentUser());
            self.changeUnitMode = true;
        };

        self.saveUnit = function () {
            ChangeUnit.saveUnit(Auth.getCurrentUser(),self.changedUnit);
            self.changeUnitMode = false;
        };

        self.cancelChangeUnit = function () {
            ChangeUnit.cancelChangeUnit();
            self.changeUnitMode = false;
        };

        $scope.caseTreeOptions = {
            nodeChildren: "children",
            dirSelectable: true
        };

        self.caseTreeData = [
                { "name" : "Mappar och dokument", "id" : "0", "type" : "root",
                "children": [
                    {"name" : "Mapp 1", "id" : "1", "type" : "folder", "children" :[
                        {"name" : "File 11", "id" : "11", "type" : "file", "children" :[]}
                    ]},
                    {"name" : "Mapp 2", "id" : "2", "type" : "folder", "children" :[]},
                    {"name" : "File 1", "id" : "3", "type" : "file", "children" :[]},
                ]}
        ];

        self.handleCaseSelection = function(node) {
            console.log('Selected node: ' + node.name);
        };

    }

})();
