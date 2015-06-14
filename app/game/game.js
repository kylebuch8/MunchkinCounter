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
    GameController.$inject = ['$routeParams', '$location', '$firebaseArray'];

    function config($routeProvider) {
        $routeProvider
            .when('/game/:gameId', {
                templateUrl: '/game/game.html',
                controller: 'GameController',
                controllerAs: 'vm'
            });
    }

    function GameController($routeParams, $location, $firebaseArray) {
        var vm = this,
            playersRef = new Firebase('https://munchkincounter.firebaseio.com/games/' + $routeParams.gameId + '/players');

        vm.gameId = $routeParams.gameId;
        vm.players = $firebaseArray(playersRef);

        vm.goToPlayer = function (index) {
            var key = vm.players.$keyAt(index);
            $location.path('/game/' + vm.gameId + '/player/' + key);
        };
    }
}());
