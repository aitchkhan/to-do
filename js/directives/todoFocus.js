/**
 * Created by hkhan on 10/1/15.
 */
angular.module('todo')
    .directive('todoFocus', function todoFocus($timeout){
        'use strict';

        return function (scope, elem, attrs) {
            scope.$watch(attrs.todoFocus, function (newVal) {
                if(newVal){
                    $timeout(function () {
                        elem[0].focus();

                    }, 0, false);
                }
            });
        };
    });