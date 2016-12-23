angular.module('qreaPublic')
    .controller('DocumentationCtrl',
	['$scope', '$state', '$log', '$rootScope', '$timeout', '$document',
        function ($scope, $state, $log, $rootScope, $timeout, $document)
         {

            $log.info("...documentation controller...");

            function getId(){

                function s4() {
                    return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
                }
                return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                    s4() + '-' + s4() + s4() + s4();

            }

            // Objet Categorie
            var Categorie = function(params){

                this.nom = params.nom;
                this.id = params.id || getId();
                this.sujets = params.sujets || [];

                this.ajouterSujet = function(sujet){

                    if(!(sujet instanceof Sujet)) throw new Error("Categorie n'accepte l'ajout que d'objet de la classe Sujet");

                    if(!this.sujets) this.sujets = [];
                    this.sujets.push(sujet);

                };

            }

            // Objet Sujet
            var Sujet = function(params){

                if(!params) throw new Error("Le paramètre params doit être défini");
                this.titreCourt = params.titreCourt;
                this.titreLong = params.titreLong  || this.titreCourt;
                this.urlHTML = params.urlHTML;
                this.urlMD = params.urlMD;
                this.id = params.id || getId();

                //retraitement si titreLong = false
                if(params.titreLong == false) this.titreLong = null;

            }

            $scope.selectSujet = function(sujet){
                $log.info("sujetSelected", sujet);
                $scope.sujetSelected = sujet;
            }

            $scope.afficherModalImage = function(id){
                var selector = '#' + id;
                $(selector).modal('show');
            }

            function test(){

                /*
                    new Categorie({
                        nom: 'Mon Expert',
                        sujets: [
                            new Sujet({
                                titreCourt: "Envoyer mes données",
                                titreLong: 'Envoyer mes données à mon Expert-Comptable',
                                urlHTML: 'views/public/documentation/doc.monExpert.envoyerMesDonnees.html'
                            })
                        ]
                    }),
                    new Categorie({
                        nom: 'Activité',
                        sujets: [
                            new Sujet({
                                titreCourt: "Tableau de bord"
                            }),
                            new Sujet({
                                titreCourt: "Produits et services"
                            })
                        ]
                    })
                */


                $scope.categories = [
                    new Categorie({
                        nom: 'Commencer !',
                        sujets: [
                            new Sujet({
                                titreCourt: "Commencer sur Qrea",
                                urlHTML: 'views/public/documentation/doc.getStarted.html'
                            }),
                            new Sujet({
                                titreCourt: "Prise en main",
                                titreLong: "Découvrez l'interface en vidéo",
                                urlHTML: 'views/public/documentation/doc.priseEnMain.html'
                            })
                        ]
                    }),
                    new Categorie({
                        nom: 'Entreprises',
                        sujets: [
                            new Sujet({
                                titreCourt: "Ajouter une entreprise",
                                titreLong: "Tutoriel vidéo : comment ajouter une entreprise ?",
                                urlHTML: 'views/public/documentation/doc.entreprises.creationEntreprise.html'
                            })
                        ]
                    }),
                    new Categorie({
                        nom: 'Activité',
                        sujets: [
                            new Sujet({
                                titreCourt: "Tableau de bord",
                                titreLong: "Tutoriel vidéo : comment fonctionne le tableau de bord ?",
                                urlHTML: 'views/public/documentation/doc.activite.tableauDeBord.html'
                            }),
                            new Sujet({
                                titreCourt: "Clients",
                                titreLong: "Tutoriel vidéo : comment gérer vos clients ?",
                                urlHTML: 'views/public/documentation/doc.activite.client.html'
                            }),
                            new Sujet({
                                titreCourt: "Produits/services",
                                titreLong: "Tutoriel vidéo : comment gérer vos produits/services ?",
                                urlHTML: 'views/public/documentation/doc.activite.articles.html'
                            }),
                            new Sujet({
                                titreCourt: "Devis",
                                titreLong: "Tutoriels vidéos : apprenez à gerer vos devis",
                                urlHTML: 'views/public/documentation/doc.activite.devis.html'
                            }),
                            new Sujet({
                                titreCourt: "Factures",
                                titreLong: "Tutoriels vidéos : apprenez à gerer vos factures",
                                urlHTML: 'views/public/documentation/doc.activite.factures.html'
                            })/*,
                            new Sujet({
                                titreCourt: "Paramètres",
                                titreLong: "Tutoriels vidéos : configurez les paramètres du module activité",
                                urlHTML: 'views/public/documentation/doc.activite.factures.html'
                            })*/
                        ]
                    }),

                ];

                $scope.paramsVideos = {
                    entreprises: {
                        creationEntreprise:{
                            source      : 'youtube',
                            id          : 'YZx9BV-b-wg',
                            icon        : 'video play',
                        }
                    },
                    activite: {
                        tableauDeBord:{
                            source      : 'youtube',
                            id          : 'i9oWgTmhV58',
                            icon        : 'video play',
                        },
                        client: {
                            id          : '-L0tl7LNLjU',
                            icon        : 'video play',
                            source      : 'youtube',
                        },
                        articles: {
                            id          : 'U263TcXBuNw',
                            icon        : 'video play',
                            source      : 'youtube',
                        },
                        formeDevis: {
                            id          : 'RZmQu3n9nVU',
                            icon        : 'video play',
                            source      : 'youtube',
                        },
                        creerDevis: {
                            id          : '7jwvhbErSIA',
                            icon        : 'video play',
                            source      : 'youtube',
                        },
                        validerDevis: {
                            id          : '0e71LpCQOAs',
                            icon        : 'video play',
                            source      : 'youtube',
                        },
                        transformerDevis: {
                            id          : 'i4V6BiP2ybs',
                            icon        : 'video play',
                            source      : 'youtube',
                        },
                        creerFacture: {
                            id          : 'lD_i20Wx3T8',
                            icon        : 'video play',
                            source      : 'youtube',
                        },
                        editerFacture: {
                            id          : 'A6GFhUv67nE',
                            icon        : 'video play',
                            source      : 'youtube',
                        },
                        familles: {
                            id          : 'jEcFglG_J00',
                            icon        : 'video play',
                            source      : 'youtube',
                        },
                        tva: {
                            id          : 'BBbgZ6ILnkc',
                            icon        : 'video play',
                            source      : 'youtube',
                        }
                    }
                };

                $scope.sujetSelected = $scope.categories[0].sujets[0];

            }

            test();

}]);
