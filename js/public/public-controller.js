(function() {

    var app = angular.module('qreaPublic');

    app.controller('PublicCtrl', ['$scope', '$state', '$log', '$rootScope', '$document', '$stateParams', PublicContoller]);

    function PublicContoller($scope, $state, $log, $rootScope, $document, $stateParams) {

        var self = this;

        self.paramsVideo = {
            source: 'youtube',
            id: 'u5XtvPG8CCI',
            icon: 'video play',
        };

        self.linkOnPage_click = function(link) {
            
            var id = '#' + link.id;
            
            if(link.id === "qrea-top"){
                $document.scrollTop(0, 500);
                
            } else {
                $document.scrollTo($(id), 0, 500);
            }
            
            link.active = true;
            
            mixpanel.track("homeLink_click");
            
        };

        function selectActiveLinkOnePage(link) {

            for (var linkIdentifier in self.links.linksOnePage) {

                var l = self.links.linksOnePage[linkIdentifier];
                l.active = false;

                if (l.id == link.id) {
                    l.active = true;
                }

            }

            $scope.$apply();

        }

        function deselectLinkOnePage(link) {

            for (var linkIdentifier in self.links.linksOnePage) {

                var l = self.links.linksOnePage[linkIdentifier];

                if (l.id == link.id) {

                    l.active = false;

                }

            }

            $scope.$apply();

        }

        self.links = {
            linksOnePage: {
                qrea: {
                    active: true,
                    id: "qrea-top",
                    name: "Qrea",
                    qrea: true
                },
                qreaVideo: {
                    active: false,
                    id: "qrea-video",
                    name: "Vidéo",
                    qrea: false
                },
                fonctionnalites: {
                    active: false,
                    id: "qrea-fonctionnalites",
                    name: "Fonctionnalités"
                },
                expertComptable: {
                    active: false,
                    id: "qrea-expert-comptable",
                    name: "Experts-Comptables"
                },
                tarifs: {
                    active: false,
                    id: "qrea-tarifs",
                    name: "Tarifs"
                },
                equipe: {
                    active: false,
                    id: "qrea-equipe",
                    name: "Equipe"
                }
            },
            linksNav: { /*  CE LIEN PEUT TOUJOURS ETRE AJOUTER POUR NAVIGUER VERS UNE PAGE !*/
                documentation: {
                    active: false,
                    id: "qrea-documentation",
                    state: "public.documentation",
                    name: "Documentation"
                }
            },
            linksRight: {
                /*
                inscription: {
                    name: "Inscription",
                    state: "inscriptionqrea",
                    route: ""
                },
                */
                connexion: {
                    name: "Connexion",
                    state: "loginqrea",
                    route: ""
                }
            }
        };

        // initialise le menu qui s'affiche quand on a passé le masthead
        function iniSemanticMenu() {

            // fix menu when passed
            $('.masthead')
                .visibility({
                    once: false,
                    onBottomPassed: function() {
                        // $log.info("on a passé le .masthead");
                        $('#menuPublic').transition('fade in');
                    },
                    onBottomPassedReverse: function() {
                        // $log.info("on revient sur le .masthead");
                        $('#menuPublic').transition('fade out');
                    }
                });

        }

        iniSemanticMenu();

        function iniSemantic() {

            function initLink(link) {

                var id = "#" + link.id;
                $(id).visibility({
                    once: false,
                    onBottomPassed: function() {
                        deselectLinkOnePage(link);
                    },
                    onBottomPassedReverse: function() {
                        selectActiveLinkOnePage(link);
                    },
                    onTopPassed: function() {
                        selectActiveLinkOnePage(link);
                    },
                    onTopPassedRevers: function() {
                        deselectLinkOnePage(link);
                    }
                });

            }

            initLink(self.links.linksOnePage.qrea);
            initLink(self.links.linksOnePage.qreaVideo);
            initLink(self.links.linksOnePage.fonctionnalites);
            initLink(self.links.linksOnePage.tarifs);
            initLink(self.links.linksOnePage.equipe);
            initLink(self.links.linksOnePage.expertComptable);

        }

        angular.element(document).ready(function() {
          iniSemantic();
          // si la div est passé en argumant on scroll vers elle
          if ($stateParams.div) {
              if (self.links.linksOnePage.qreaVideo.id == $stateParams.div) {
                  self.linkOnPage_click(self.links.linksOnePage.qreaVideo);
              }
          }
        });

        // constructeur de lien
        var Link = function Link(id, url, name, route, primary) {

            this.url = url;
            this.name = name;
            this.id = id;

            if ($state.current.name == route) {
                this.active = true;
            } else {
                this.active = false;
            }

            if (route == 'public.home') {
                this.qrea = true;
            } else {
                this.qrea = false;
            }

            this.primary = primary;

            return this;
        };

        function ini() {

            self.rightLinks = [
                //new Link("qrea-inscription", 'https://qrea.herokuapp.com/#/qrea/inscription', 'Inscription', 'inscriptionqrea', false),
                new Link("qrea-login", 'https://qrea.herokuapp.com/#/qrea/login/', 'Connexion', 'loginqrea', true)
            ];

            self.banniereVisible = false;
            if ($state.current.name == "home") {
                self.banniereVisible = true;
            }

        }

        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            // do something
            ini();
        });

        ini();

    }



})();
