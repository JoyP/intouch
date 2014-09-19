(function(){
  'use strict';

  angular.module('intouch')
  .controller('RegisterCtrl', ['$scope', '$location', 'User', function($scope, $location, User){
    $scope.user = {};

    function success(response){
      toastr.error('Successfull register!');
      $location.path('/login');
    }

    function failure(response){
      toastr.error('ERROR, please fiz, or try again!');
      $scope.user = {};
    }

    $scope.register = function(){
      User.register($scope.user).then(success, failure);
    };
  }]);
})();
