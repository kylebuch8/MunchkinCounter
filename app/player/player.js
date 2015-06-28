(function () {
    'use strict';

    /*global angular, Firebase*/
    angular.module('mc-player', [
        'ngRoute',
        'ngMaterial',
        'firebase'
    ])

        .config(config)
        .controller('PlayerController', PlayerController);

    config.$inject = ['$routeProvider'];
    PlayerController.$inject = ['player'];

    function config($routeProvider) {
        $routeProvider
            .when('/game/:gameId/player/:playerId', {
                templateUrl: '/player/player.html',
                controller: 'PlayerController',
                controllerAs: 'vm',
                resolve: {
                    player: playerPrep
                }
            });
    }

    playerPrep.$inject = ['$route', '$q', '$firebaseObject', 'firebaseLocation'];

    function playerPrep($route, $q, $firebaseObject, firebaseLocation) {
        var deferred = $q.defer(),
            playerRef = new Firebase(firebaseLocation + '/games/' + $route.current.params.gameId + '/players/' + $route.current.params.playerId);

        playerRef.on('value', function (snapshot) {
            if (snapshot.exists()) {
                deferred.resolve($firebaseObject(playerRef));
            } else {
                deferred.reject();
            }
        });

        return deferred.promise;
    }

    function PlayerController(player) {
        var vm = this;

        vm.player = player;

        vm.levelDown = function () {
            if (vm.player.level > 1) {
                vm.player.level -= 1;
                vm.player.$save();
            }
        };

        vm.levelUp = function () {
            vm.player.level += 1;
            vm.player.$save();
        };

        vm.bonusesDown = function () {
            if (vm.player.bonuses > 0) {
                vm.player.bonuses -= 1;
                vm.player.$save();
            }
        };

        vm.bonusesUp = function () {
            vm.player.bonuses += 1;
            vm.player.$save();
        };

        vm.setGender = function (gender) {
            vm.player.gender = gender;
            vm.player.$save();
        };

        vm.goBack = function () {
            window.history.back();
        };
    }
}());
