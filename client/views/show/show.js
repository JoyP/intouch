(function(){
  'use strict';

  angular.module('intouch')
  .controller('ShowCtrl', ['$scope', 'Show','Priority', 'Task', function($scope, Priority, Task, show){
    $scope.task = {};
  }]);
})();
