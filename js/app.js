/**
 * Created by hkhan on 9/28/15.
 */

angular.module('todo')
    .config(function ($stateProvider, $urlRouteProvider) {
        // For any unmatched Url, redirect to /
        $urlRouteProvider.otherwise('/');

        //setting up states
        $stateProvider
            .state('home', {
                url: "/",
                templateUrl : "todomvc-index.html",
                controller: 'todoCtrl'
            });
    });
