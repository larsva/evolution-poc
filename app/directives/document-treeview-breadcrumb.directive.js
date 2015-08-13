angular.module('app')
    .directive('documentBreadCrumbs', ['DocumentTree', DocumentBreadCrumbs]);
    function DocumentBreadCrumbs(DocumentTree) {
        var controller = function () {
            var self = this;
            DocumentTree.subscribeOnSelection(function (node) {
                self.crumbs = [node];
                while (node && node.parent) {
                    var node = node.parent;
                    self.crumbs.unshift(node);
                }
            });

            self.navigateToCrumb = function (node) {
                DocumentTree.setSelectedNode(node);
            };

        };
        return {
            restrict: 'AE',
            replace: false,
            scope: {},
            controller: controller,
            controllerAs: 'breadCrumbs',
            template: '<ol class="breadcrumb"> ' +
            '  <li ng-repeat="crumb in breadCrumbs.crumbs"> ' +
            '     <a ng-click="breadCrumbs.navigateToCrumb(crumb)">{{ crumb.name }}</a> ' +
            '  </li>' +
            '</ol>',
        };
    }