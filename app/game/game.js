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

    gamePrep.$inject = ['$route', '$firebaseObject', '$q', 'firebaseLocation'];

    function gamePrep($route, $firebaseObject, $q, firebaseLocation) {
        var gameRef = new Firebase(firebaseLocation + '/games/' + $route.current.params.gameId),
            deferred = $q.defer();

        gameRef.on('value', function (snapshot) {
            if (snapshot.exists()) {
                deferred.resolve($firebaseObject(gameRef));
            } else {
                deferred.reject();
            }
        });

        return deferred.promise;
    }

    function GameController($routeParams, $location, game) {
        var vm = this;

        vm.gameId = $routeParams.gameId;
        vm.game = game;

        vm.goToPlayer = function (key) {
            $location.path('/game/' + vm.gameId + '/player/' + key);
        };

        vm.goToSettings = function () {
            $location.path('/game/' + vm.gameId + '/setup');
        };

        vm.goToHome = function () {
            $location.path('/');
        };
    }
}());
