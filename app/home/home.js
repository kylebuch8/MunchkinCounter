(function () {
    'use strict';

    /*global angular*/
    angular.module('mc-home', [
        'ngRoute'
    ])

        .config(config)
        .controller('HomeController', HomeController);

    config.$inject = ['$routeProvider'];

    function config($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/home/home.html',
                controller: 'HomeController',
                controllerAs: 'vm'
            });
    }

    function HomeController() {

    }
}());
