(function () {
    'use strict';

    /*global angular*/
    angular.module('mc-setup', [
        'ngRoute',
        'firebase'
    ])

        .config(config)
        .controller('SetupController', SetupController)
        .controller('PlayerFormController', PlayerFormController);

    config.$inject = ['$routeProvider'];
    SetupController.$inject = ['$scope', '$location', '$mdDialog', 'game'];

    function config($routeProvider) {
        $routeProvider
            .when('/game/:gameId/setup', {
                templateUrl: 'setup/setup.html',
                controller: 'SetupController',
                controllerAs: 'vm',
                resolve: {
                    game: gamePrep
                }
            });
    }

    gamePrep.$inject = ['$route', '$firebaseObject', '$firebaseArray', '$q', 'firebaseLocation'];

    function gamePrep($route, $firebaseObject, $firebaseArray, $q, firebaseLocation) {
        var gameRef = new Firebase(firebaseLocation + '/games/' + $route.current.params.gameId),
            playersRef = new Firebase(firebaseLocation + '/games/' + $route.current.params.gameId + '/players'),
            gameDeferred = $q.defer();

        gameRef.on('value', function (snapshot) {
            if (snapshot.exists()) {
                gameDeferred.resolve($firebaseObject(gameRef));
            } else {
                gameDeferred.reject();
            }
        });

        return $q.all([gameDeferred.promise, $firebaseArray(playersRef)]);
    }

    function SetupController($scope, $location, $mdDialog, game) {
        var vm = this,
            dialogOpen = false;

        vm.game = game[0];
        vm.players = game[1];
        vm.colors = ['#c00', 'green', 'purple', '#FF7600', '#0854C7', '#ffcc00'];
        vm.newPlayerColor = null;

        document.addEventListener('backbutton', backbuttonHandler, false);

        function backbuttonHandler() {
            if (dialogOpen) {
                $mdDialog.cancel();
                return;
            }

            navigator.app.backHistory();
        }

        vm.showPlayerForm = function (event, player) {
            dialogOpen = true;

            $mdDialog
                .show({
                    templateUrl: 'setup/player-dialog.html',
                    controller: PlayerFormController,
                    controllerAs: 'vm',
                    targetEvent: event,
                    resolve: {
                        player: function () {
                            return player;
                        }
                    }
                })
                .then(function (player) {
                    if (!player.update) {
                        player.level = 1;
                        player.bonuses = 0;

                        vm.players.$add(player);
                        return;
                    }

                    delete player.update;
                    vm.players.$save(player);
                })
                .finally(function () {
                    dialogOpen = false;
                });
        };

        vm.addPlayer = function () {
            var newPlayer = {
                name: vm.newPlayerName,
                level: 1,
                bonuses: 0,
                color: vm.newPlayerColor
            };

            vm.players.$add(newPlayer);
            vm.newPlayerName = '';
            vm.showForm = false;
        };

        vm.removePlayer = function (index) {
            vm.players.$remove(index);
        };

        vm.updatePlayer = function (index) {
            vm.players.$save(index);
        };

        vm.playGame = function () {
            $location.path('/game/' + vm.game.$id);
        };

        $scope.$on('$destroy', destroyHandler);

        function destroyHandler() {
            document.removeEventListener('backbutton', backbuttonHandler);
        }
    }

    PlayerFormController.$inject = ['$mdDialog', 'player'];

    function PlayerFormController($mdDialog, player) {
        var vm = this;

        if (player) {
            vm.edit = true;
        }

        vm.player = player;
        vm.colors = ['#c00', 'green', 'purple', '#FF7600', '#0854C7', '#ffcc00'];

        vm.submit = function (update) {
            if (update) {
                vm.player.update = true;
            }

            $mdDialog.hide(vm.player);
        };

        vm.close = function () {
            $mdDialog.cancel();
        };
    }
}());
