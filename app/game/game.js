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
    GameController.$inject = ['$routeParams', '$location', '$firebaseArray', 'firebaseLocation'];

    function config($routeProvider) {
        $routeProvider
            .when('/game/:gameId', {
                templateUrl: '/game/game.html',
                controller: 'GameController',
                controllerAs: 'vm'
            });
    }

    function GameController($routeParams, $location, $firebaseArray, firebaseLocation) {
        var vm = this,
            playersRef = new Firebase(firebaseLocation + '/games/' + $routeParams.gameId + '/players');

        console.log(firebaseLocation);

        vm.gameId = $routeParams.gameId;
        vm.players = $firebaseArray(playersRef);

        vm.goToPlayer = function (index) {
            var key = vm.players.$keyAt(index);
            $location.path('/game/' + vm.gameId + '/player/' + key);
        };
    }
}());
