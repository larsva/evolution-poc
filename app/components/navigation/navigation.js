(function () {
    'use strict';

    angular
        .module('app.navigation', [])
        .controller('NavigationController', ['Auth', 'ChangeUnit', 'Document', NavigationController]);


    function NavigationController(Auth, ChangeUnit, Document) {
        /* jshint validthis:true */
        var self = this;
        self.document = Document;
        self.documentTreeData = [];
        self.changeUnitMode = false;

        self.startChangeUnit = function () {
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


        var documentTreeData = Document.getDocuments().query(function () {
            self.documentTreeData = documentTreeData;
        });

        self.handleDocumentSelection = function (node) {
            console.log('Selected node: ' + node.name);
        };


    }

    NavigationController.prototype.activate = function($scope) {
       $scope.options = this.document.getDocumentTreeOptions();
    };

})();
