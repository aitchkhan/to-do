/**
 * Created by hkhan on 9/28/15.
 */





angular.module('todo', ['ngRoute'])
    .config(function ($routeProvider) {
        'use strict';

        var routeConfig = {
            controller: 'todoCtrl',
            templateUrl: 'todomvc-index.html',
            resolve: {
                store: function (todoStorage) {
                    // Get the correct module (API or localStorage).
                    return todoStorage;
                    //return JSON.parse(localStorage.getItem('todos-angularjs'));
                }
            }
        };

        $routeProvider
            .when('/', routeConfig)
            .when('/:status', routeConfig)
            .otherwise({
                redirectTo: '/'
            });
    });


/*
angular.module('todo', ['ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {
        // For any unmatched Url, redirect to /
        $urlRouterProvider.otherwise('/');

        //setting up states
        $stateProvider
            .state("home", {
                url: "/",
                templateUrl : "todomvc-index.html",
                controller: 'todoCtrl'
            });
    });
*/