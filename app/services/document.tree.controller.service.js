(function () {
    'use strict';

    angular
        .module('app')
        .constant('DOCUMENT_TREE',{
            ACTIVATED: 'activated',
            DEACTIVATED: 'deactivated'
            })
         .factory('DocumentTree', ['$log','DOCUMENT_TREE',DocumentTreeControllerService]);

    function DocumentTreeControllerService($log,DOCUMENT_TREE) {
        var self = this;

        self.selectedDocumentSubject = new Rx.Subject();
        self.documentTreeStateSubject = new Rx.Subject();
        self.selectedNode = null;
        self.documentTreeActivated = false;

        return {
            setSelectedNode: setSelectedNode,
            getSelectedNode: getSelectedNode,
            subscribeOnSelection: subscribeOnSelection,
            subscribeOnState: subscribeOnState,
            activateDocumentTree: activateDocumentTree,
            deactivateDocumentTree: deactivateDocumentTree,
            isDocumentTreeActivated: isDocumentTreeActivated
        };

        //noinspection JSUnusedLocalSymbols
        function setSelectedNode(node) {
            $log.debug('Selected node: [' + node ? (+ node.name + ',' + node.id): 'null' + ']');
            self.selectedNode = node;
            self.selectedDocumentSubject.onNext(self.selectedNode);
        };

        function getSelectedNode() {
            return self.selectedNode;
        };

        function subscribeOnSelection(subscription) {
           return self.selectedDocumentSubject.subscribe(subscription);
        };

        function subscribeOnState(subscription) {
           return  self.documentTreeStateSubject.subscribe(subscription);
        };

        function activateDocumentTree() {
            $log.debug("Activate document tree");
            self.documentTreeActivated = true;
            self.documentTreeStateSubject.onNext(DOCUMENT_TREE.ACTIVATED)
        };

        function deactivateDocumentTree() {
            $log.debug("Deactivate document tree");
            self.documentTreeActivated = false;
            self.documentTreeStateSubject.onNext(DOCUMENT_TREE.DEACTIVATED)
        };

        function isDocumentTreeActivated() {
            return self.documentTreeActivated;
        }

      }

})();
