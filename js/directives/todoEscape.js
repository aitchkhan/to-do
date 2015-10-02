/**
 * Created by hkhan on 10/1/15.
 */

angular.module('todo')
    .directive('todoEscape', function todoEscape(){
        'use strict';

        var ESCAPE_KEY = 27;

        return function (scope, elem, attrs) {
            elem.bind('keydown', function (event) {
                if(event.keyCode === ESCAPE_KEY) {
                    scope.$apply(attrs.todoEscape)
                }
            });
        };
        scope.$on('$destroy', function () {
            elem.unbind('keydown');
        });
    });

