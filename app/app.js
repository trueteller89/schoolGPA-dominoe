'use strict';
angular.module('myApp', [
    'ngRoute',
    'myApp.domino',
    'myApp.rating'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({redirectTo: '/rating'});
}]);

