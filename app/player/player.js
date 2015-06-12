(function () {
    'use strict';

    /*global angular*/
    angular.module('mc-player', [
        'ngRoute'
    ])

        .config(config)
        .controller('PlayerController', PlayerController);

    config.$inject = ['$routeProvider'];

    function config($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/player/player.html',
                controller: 'PlayerController',
                controllerAs: 'vm'
            });
    }

    function PlayerController() {

    }
}());
