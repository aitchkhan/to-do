/**
 * Created by hkhan on 9/28/15.
 */
'use strict';

angular.module('todo')
    .controller('todoCtrl', function todoCtrl($scope, $routeParams, $filter, store) {
        var todos = $scope.todos = store.todos;
        console.log(store);
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

            //Clone the original to-do to restore it on demand
            $scope.originalTodo = angular.extend({}, todo );
        };

        $scope.saveEdits = function (todo, event) {
            //Blur events are triggered after the form submit event
            if(event === "blur" && $scope.saveEvent === "submit")  {
                $scope.saveEvent = null;
                return ;
            }

            $scope.saveEvent = event;

            if($scope.reverted){
                //To-do edits were reverted -- don't save

                $scope.reverted = null;
                return;
            }

            todo.title = todo.title.trim();

            if(todo.title === $scope.originalTodo.title) {
                $scope.editedTodo = null;
                return;
            }

            store[todo.title ? 'put' : 'delete'](todo)
                .then(function success() {}, function error() {
                    todo.title = $scope.originalTodo.title;
                })
                .finally(function () {
                    $scope.editedTodo = null;
                });

        };



        $scope.revertEdits = function (todo) {
            todos[todos.indexOf(todo)] = $scope.originalTodo;
            $scope.editedTodo = null;
            $scope.originalTodo = null;
            $scope.reverted = true;
        };

        $scope.removeTodo = function(todo) {
            store.delete(todo);
        };

        $scope.saveTodo = function (todo) {
            store.put(todo);
        };

        $scope.toggleCompleted = function (todo, completed) {
            if (angular.isDefined(completed)) {
                todo.completed = completed;
            }
            store.put(todo, todos.indexOf(todo))
                .then(function success() {
                }, function error() {
                    todo.completed = !todo.completed;
                });

        };

        $scope.clearCompletedTodos = function () {
            store.clearCompleted();
        };

        $scope.markAll = function (completed) {
            todos.forEach(function (todo) {
                if(todo.completed !== completed) {
                    $scope.toggleCompleted(todo, completed);
                }
            });
        };
    });