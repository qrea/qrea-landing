angular.module('qreaPublic')
  .controller('PresseCtrl', ['$scope', '$state', '$log', '$rootScope',
  '$timeout', '$document',
    function($scope, $state, $log, $rootScope, $timeout, $document) {

      // $scope.$parent.title = 'Presse'
      var Article = function(params){

        this.title = params.title;
        this.description = params.description;
        this.imgSrc = params.imgSrc;
        this.link = params.link;

      }

      $scope.articles = [
        new Article({
          title: 'Info-Eco',
          description: '',
          imgSrc: 'http://www.info-eco.fr/images/logo.png',
          link: 'http://www.info-eco.fr/qrea-veut-faciliter-la-facturation-des-tpe/453147'
        })
      ]

    }
  ]);
