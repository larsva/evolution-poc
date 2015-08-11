(function () {
    angular.module('app.document', [])
        .controller('DocumentController', ['Document', 'DocumentTree', 'AuthMixin', DocumentController]);

    function DocumentController(Document, DocumentTree, AuthMixin) {
        var self = this;
        self.authMixin = AuthMixin;
        self.documentTree = DocumentTree;
        self.document = Document;

        angular.extend(self, AuthMixin);

        self.handleSelectedNode = function (selectedNode) {
            self.selectedNode = selectedNode;
        };

        self.showRootNode = function () {
            var documents = Document.getDocuments().query(function () {
                self.handleSelectedNode({name: "root", "id": -1, "children": DocumentTree.nodify(documents)});
            });
        };

        self.openNode = function (node) {
            self.handleSelectedNode(node);
        };

        self.getNodesToRender = function () {
            if (self.selectedNode) {
                return self.selectedNode.children.length > 0 ? self.selectedNode.children : [self.selectedNode];

            } else {
                return [];
            }
        };
    }

    DocumentController.prototype.activate = function () {
        this.subscription = this.documentTree.subscribeOnSelection(this.handleSelectedNode);
        this.showRootNode();
    };

    DocumentController.prototype.deactivate = function () {
        this.subscription.dispose();
    };

})();