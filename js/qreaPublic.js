(function() {

    var app = angular.module('qreaPublic', ['ui.router', 'duScroll']);

    app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

      //$locationProvider.html5Mode(false); // pas trouvé le support rewrite pour github.io

      $stateProvider
        .state('home', {
            url: '/home/:div',
            templateUrl: 'views/public/public.html',
            controller: 'PublicCtrl',
            controllerAs: 'ctrl'
        })

        .state('public', {
            abstract: true,
            templateUrl: "views/public/pages/pages.html"
        })

        .state('pages', {
            templateUrl: 'views/public/pages/pages.html',
            abstract: true,
            controller: 'PageCtrl'
        })

        .state('pages.presse', {
            url: '/pages/presse',
            templateUrl: 'views/public/pages/presse.html',
            controller: 'PresseCtrl'
        })

        .state('pages.mentionsLegales', {
            url: '/pages/mentions-legales',
            templateUrl: 'views/public/pages/mentions-legales.html'
        })

        .state('pages.cgu', {
            url: '/pages/cgu',
            templateUrl: 'views/public/pages/cgu.html'
        })

        .state('pages.goodBye', {
            url: '/pages/goodBye',
            templateUrl: 'views/public/pages/goodbye.html'
        })

        .state('documentation', {
            templateUrl: 'views/public/documentation/documentation.html',
            url: '/documentation',
            controller: 'DocumentationCtrl'
        });

        $urlRouterProvider.otherwise('/home/');

    }]);

}());
