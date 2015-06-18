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
    SetupController.$inject = ['$routeParams', '$location', '$firebaseObject', '$firebaseArray', 'firebaseLocation'];

    function config($routeProvider) {
        $routeProvider
            .when('/game/:gameId/setup', {
                templateUrl: 'setup/setup.html',
                controller: 'SetupController',
                controllerAs: 'vm'
            });
    }

    function SetupController($routeParams, $location, $firebaseObject, $firebaseArray, firebaseLocation) {
        var vm = this,
            gameRef = new Firebase(firebaseLocation + '/games/' + $routeParams.gameId),
            playersRef = new Firebase(firebaseLocation + '/games/' + $routeParams.gameId + '/players');

        vm.game = $firebaseObject(gameRef);
        vm.players = $firebaseArray(playersRef);

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
            $location.path('/game/' + $routeParams.gameId);
        };
    }
}());
