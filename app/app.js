(function () {
    'use strict';

    /*global angular*/
    angular.module('munchkincounter', [
        'mc-home',
        'mc-game',
        'mc-setup',
        'mc-player'
    ])

        .constant('firebaseLocation', 'https://munchkincounter.firebaseio.com/');
}());
