/**
 * Created by hkhan on 9/28/15.
 */
'use strict';

angular.module('todo')
    .controller('todoCtrl', function todoCtrl($scope, $routeParams, $filter, store) {
        var todos = $scope.todos = store.todos;

        $scope.newTodo = "";
        $scope.editedTodo = null;

        $scope.$watch('todos', function () {
            $scope.remainingCount = $filter('filter')(todos, { completed: false }).length;
            $scope.completedCount = todos.length = $scope.remainingCount;
            $scope.allChecked = !$scope.remainingCount;
        }, true);

        // Monitor the current route for changes and adjust the filter accordingly
        $scope.$on('$routeChangeSuccess', function () {
            var status = $scope.status = $routeParams.status
        })
        
    })