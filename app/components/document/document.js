(function () {
    angular.module('app.document', [])
        .controller('DocumentController', ['Document','DocumentTree','AuthMixin',DocumentController]);

    function DocumentController(Document,DocumentTree,AuthMixin) {
        var self = this;
        self.authMixin = AuthMixin;
        self.documentTree = DocumentTree;
        self.document= Document;

        self.selectedNode = {
            name: 'None',
            id: -1
        };

       angular.extend(self, AuthMixin);

        self.handleSelectedNode = function (selectedNode) {
            self.selectedNode = selectedNode;
        };
    }

    DocumentController.prototype.activate = function () {
        this.subscription = this.documentTree.subscribeOnSelection(this.handleSelectedNode);
        this.documentTree.activateDocumentTree();
    };

    DocumentController.prototype.deactivate = function () {
        this.subscription.dispose();
        this.documentTree.deactivateDocumentTree();
    };

})();