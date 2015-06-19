(function () {
    'use strict';

    /*global angular*/
    angular.module('mc-setup', [
        'ngRoute',
        'firebase'
    ])

        .config(config)
        .controller('SetupController', SetupController);

    config.$inject = ['$routeProvider'];
    SetupController.$inject = ['$location', 'game'];

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

    function SetupController($location, game) {
        var vm = this;

        vm.game = game[0];
        vm.players = game[1];

        vm.addPlayer = function () {
            var newPlayer = {
                name: vm.newPlayerName,
                level: 1
            };

            vm.players.$add(newPlayer);
            vm.newPlayerName = '';
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
    }
}());
