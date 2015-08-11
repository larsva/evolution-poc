/**
 * Directive that will display a correct document icon based
 * on the document/folder type.
 */
(function () {
    angular.module('app')
        .constant('DOCUMENT_TYPE', {
            FOLDER: 'icon-folder-black.svg',
            TEXT_DOCUMENT: 'icon-document-text.svg',
            IMAGE_DOCUMENT: 'icon-document-image.svg',
            KALKYL_DOCUMENT: 'icon-document-kalkyl.svg',
            MAIL_DOCUMENT: 'icon-document-mail.svg',
            MOVIE_DOCUMENT: 'icon-document-movie.svg',
            PACKED_DOCUMENT: 'icon-document-packed.svg',
            PDF_DOCUMENT: 'icon-document-pdf.svg',
            PRESENTATION_DOCUMENT: 'icon-document-presentation.svg',
            PURE_TEXT_DOCUMENT: 'icon-document-pure-text.svg',
            DOCUMENT: 'icon-document-generic.svg',
        })
        .directive("renderDocumentIcon", ['DOCUMENT_TYPE',RenderDocumentIcon]);

    function RenderDocumentIcon(DOCUMENT_TYPE) {
        var controller = function () {
            var self = this;
            self.documentTypeToIcon = function (documentType) {
                var docType = documentType.toUpperCase().replace('-','_');
                var name = DOCUMENT_TYPE[docType];
                return name ? name : DOCUMENT_TYPE.DOCUMENT;
            };

            self.iconName = 'images/' + self.documentTypeToIcon(self.documentType);

        };

        var template = '<img src="{{renderIcon.iconName}}" class="icon-folder" />';
        return {
            restrict: 'EA', //Default for 1.3+
            scope: {
                documentType: '@'
            },
            controller: controller,
            controllerAs: 'renderIcon',
            bindToController: true, //required in 1.3+ with controllerAs
            template: template
        };
    }
})();
