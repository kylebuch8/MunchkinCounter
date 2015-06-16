(function () {
    'use strict';

    /*global angular*/
    angular.module('mc-home', [
        'ngRoute'
    ])

        .config(config)
        .controller('HomeController', HomeController);

    config.$inject = ['$routeProvider'];
    HomeController.$inject = ['$location'];

    function config($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'home/home.html',
                controller: 'HomeController',
                controllerAs: 'vm'
            });
    }

    function generateRandomId() {
        return Math.random().toString(36).substr(2, 7);
    }

    function HomeController($location) {
        var vm = this;

        vm.goToGame = function () {
            $location.path('/game/' + vm.game.id);
        };

        vm.startNewGame = function () {
            var id = generateRandomId(),
                gameRef = new Firebase('https://munchkincounter.firebaseio.com/games/' + id),
                game = {
                    players: [],
                    winningLevel: 10,
                    createDate: Firebase.ServerValue.TIMESTAMP
                },
                newGameRef = gameRef.set(game);

            $location.path('/game/' + id + '/setup');
        };
    }
}());
