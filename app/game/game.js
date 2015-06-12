(function () {
    'use strict';

    /*global angular*/
    angular.module('mc-game', [
        'ngRoute'
    ])

        .config(config)
        .controller('GameController', GameController);

    config.$inject = ['$routeProvider'];

    function config($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/game/game.html',
                controller: 'GameController',
                controllerAs: 'vm'
            });
    }

    function GameController() {

    }
}());
