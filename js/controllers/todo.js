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
            var status = $scope.status = $routeParams.status || '';

            $scope.statusFilter = (status === 'active') ? { completed: false }
                : (status === 'completed') ? { completed: true }
                : {} ;
        });

        //add new to-do to localStoreage
        $scope.addTodo = function () {
            var newToDo = {
                title: $scope.newTodo.trim(),
                completed: false
            };

            if(!newToDo.title) {
                return ;
            }

            $scope.saving = true;

            store.insert(newToDo)
                .then(function success(){
                    $scope.newTodo = '';
                })
                .finally(function () {
                    $scope.saving = false;
                });

        };

        $scope.editTodo = function(todo) {
            $scope.editedTodo = todo;

            //Clone the original todo to restore it on demand

        }


        
    });