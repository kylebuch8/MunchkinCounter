(function () {
    'use strict';

    /*global angular, Firebase*/
    angular.module('mc-player', [
        'ngRoute',
        'firebase'
    ])

        .config(config)
        .controller('PlayerController', PlayerController);

    config.$inject = ['$routeProvider'];
    PlayerController.$inject = ['$routeParams', '$firebaseObject'];

    function config($routeProvider) {
        $routeProvider
            .when('/game/:gameId/player/:playerId', {
                templateUrl: '/player/player.html',
                controller: 'PlayerController',
                controllerAs: 'vm'
            });
    }

    function PlayerController($routeParams, $firebaseObject) {
        var vm = this,
            playerRef;

        vm.gameId = $routeParams.gameId;
        vm.playerId = $routeParams.playerId;

        playerRef = new Firebase('https://munchkincounter.firebaseio.com/games/' + vm.gameId + '/players/' + vm.playerId);
        vm.player = $firebaseObject(playerRef);

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

        vm.setGender = function (gender) {
            vm.player.gender = gender;
            vm.player.$save();
        };
    }
}());
