(function() {

    var app = angular.module("qreaPublic");

    app.component('qreaVideo', {
        bindings: {
            params: '<'
        },
        transclude: true,
        templateUrl: 'views/public/qreaVideoComponentTemplate.html',
        controller: 'QreaVideoController',
        controllerAs: 'ctrl'
    });


    app.controller("QreaVideoController", ['$log', '$timeout', '$scope', QreaVideoController]);

    function QreaVideoController($log, $timeout, $scope) {

        var self = this;

        function getGuid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }

        self.id = getGuid();

        var selector = '#' + self.id;

        if (!self.params || !self.params.source || !self.params.id) throw new Error("Les paramètres du components sont incomplets", self.params);

        $log.info("------------------------------------------------->>>>>>>>>>>>>>>>>>>>>> ini de la video embed", selector);

        angular.element(document).ready(function() {
          $(selector).embed(self.params);
        });

    }




})();
