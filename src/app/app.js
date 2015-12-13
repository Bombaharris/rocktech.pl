/* global angular */

'use strict';

var rockApp = angular.module('rockApp', [
    'ngRoute',
    'ngAria'
]);

rockApp.config(['$routeProvider', '$locationProvider', '$compileProvider',
    function ($routeProvider, $locationProvider, $compileProvider) {

        $locationProvider.html5Mode({
            enabled: false,
            requireBase: false
        });

        $compileProvider.debugInfoEnabled(false);

        $routeProvider
                .when('/:page', {
                    templateUrl: function (params) {
                        return 'app/partials/' + params.page + '.html';
                    }
                }).
                otherwise({
                    redirectTo: '/index'
                });
    }]);

rockApp.run(['$rootScope',
    function ($rootScope) {


    }]);

rockApp.controller('RockCtrl', ['$scope', '$location','$anchorScroll',
    function ($scope, $location,$anchorScroll) {
        $scope.scrollTo = function (id,page) {
            if (page) {
                $location.path(page);
            }
            $location.hash(id);
            $anchorScroll();
        };

    }]);