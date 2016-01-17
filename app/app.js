(function () {
    'use strict';

    /*global angular*/
    angular.module('munchkincounter', [
        'mc-home',
        'mc-game',
        'mc-setup',
        'mc-player'
    ])

        .constant('firebaseLocation', 'https://munchkincounter.firebaseio.com/')
        .run(run);

    run.$inject = ['$location'];

    function run($location) {
        window.handleOpenURL = function (url) {
            var parts = url.split('/');
            $location.path('/game/' + parts[parts.length - 1]);
        };
    }
}());
