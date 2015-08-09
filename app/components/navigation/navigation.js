(function () {
    'use strict';

    angular
        .module('app.navigation', [])
        .controller('NavigationController', ['Auth', 'ChangeUnit', 'Document', 'DocumentTree','DOCUMENT_TREE','AuthMixin', NavigationController]);


    function NavigationController(Auth, ChangeUnit, Document, DocumentTree,DOCUMENT_TREE,AuthMixin) {
        /* jshint validthis:true */
        var self = this;
        self.document = Document;
        self.authMixin = AuthMixin;
        self.documenTree = DocumentTree;
        self.documenTreeConstants = DOCUMENT_TREE;
        self.documentTreeData = [];
        self.changeUnitMode = false;
        self.documentTreeActivated = false;

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

        self.handleDocumentTreeStateChange = function (state) {
            self.documentTreeActivated = state === DOCUMENT_TREE.ACTIVATED;
        };

        self.handleDocumentSelection = function(selectedNode) {
            DocumentTree.setSelectedNode(selectedNode);
        };

    }

    NavigationController.prototype.activate = function ($scope) {
        console.log('Activate navigation');
        $scope.options = this.document.getDocumentTreeOptions();
        this.documentTreeStateSubscription = this.documenTree.subscribeOnState(this.handleDocumentTreeStateChange);
     };

    NavigationController.prototype.deactivate = function () {
        console.log('Deactivate navigation');
        this.documentTreeStateSubscription.dispose();
    };

})();
