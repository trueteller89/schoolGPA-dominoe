/**
 * Created by Regrem PC2 on 25.01.2017.
 */
'use strict';

angular.module('myApp.domino', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/domino', {
            templateUrl: 'domino/domino.html',
            controller: 'dominoController'
        });
    }])

    .controller('dominoController', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
        $scope.topPoint = 1;//set default number of top points
        $scope.bottomPoint = 1;//set default number of bottom points
        var wi, hi;//width and height of dominoe in integers
        $scope.direction = 'strictly';//set direction
        $scope.changeSize = function () {
            //count new sizes after scrollbar changes
            $scope.width = wi * $scope.dominoSize + 'px';
            $scope.height = hi * $scope.dominoSize + 'px';
        };
        $http.get("params.json").then(function (res) {
            //get all initialization parametres from json file
            $scope.dominoSize = res.data.dominoSize.dominoSize;
            $scope.dominoSizeMin = res.data.dominoSize.dominoSizeMin;
            $scope.dominoSizeMax = res.data.dominoSize.dominoSizeMax;
            $scope.controlSpeed = res.data.dominoSize.controlSpeed;
            $scope.controlSpeedMin = res.data.dominoSize.controlSpeedMin;
            $scope.controlSpeedMax = res.data.dominoSize.controlSpeedMax;
            $scope.avaliablePoints = res.data.avaliablePoints;
            wi = res.data.width;
            hi = res.data.height;
            $scope.width = wi + 'px';
            $scope.height = res.data.height + 'px';
        });

    }])
;