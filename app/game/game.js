(function () {
    'use strict';

    /*global angular, Firebase*/
    angular.module('mc-game', [
        'ngRoute',
        'firebase'
    ])

        .config(config)
        .controller('GameController', GameController);

    config.$inject = ['$routeProvider'];
    GameController.$inject = [
        '$routeParams',
        '$location',
        '$firebaseArray',
        '$firebaseObject',
        'firebaseLocation',
        'game'
    ];

    function config($routeProvider) {
        $routeProvider
            .when('/game/:gameId', {
                templateUrl: '/game/game.html',
                controller: 'GameController',
                controllerAs: 'vm',
                resolve: {
                    game: gamePrep
                }
            });
    }

    gamePrep.$inject = ['$route', '$firebaseObject', 'firebaseLocation'];

    function gamePrep($route, $firebaseObject, firebaseLocation) {
        var gameRef = new Firebase(firebaseLocation + '/games/' + $route.current.params.gameId);
        return $firebaseObject(gameRef);
        // gameRef.on('value', function (snapshot) {
        //     if (snapshot.exists()) {
        //         return $firebaseObject(gameRef);
        //     }
        // });
    }

    function GameController($routeParams, $location, $firebaseArray, $firebaseObject, firebaseLocation, game) {
        var vm = this,
            gameRef = new Firebase(firebaseLocation + '/games/' + $routeParams.gameId),
            playersRef = new Firebase(firebaseLocation + '/games/' + $routeParams.gameId + '/players');

        vm.gameId = $routeParams.gameId;
        vm.game = $firebaseObject(gameRef);
        vm.players = $firebaseArray(playersRef);

        vm.game.$loaded(function (game) {
            if (!game.$id) {
                console.log('there was an error');
            }
        }, function (error) {
            console.log(error);
        });

        vm.goToPlayer = function (index) {
            var key = vm.players.$keyAt(index);
            $location.path('/game/' + vm.gameId + '/player/' + key);
        };
    }
}());
