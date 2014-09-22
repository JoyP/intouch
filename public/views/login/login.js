(function(){
  'use strict';

  angular.module('intouch')
  .controller('LoginCtrl', ['$scope', '$location', 'User', function($scope, $location, User){
    $scope.hideRegister = true;
    $scope.user = {};

    $scope.toggleRegister = function(){
      $scope.hideRegister = !!!$scope.hideRegister;
      $('#toggleReg').fadeIn(1000);
    };

    function success(response){
      toastr.success('Successful.');
      $location.path('/');
    }

    function failure(response){
      toastr.error('Error, try again.');
      $scope.user = {};
    }

    $scope.loginUser = function(){
      User.loginUser($scope.user).then(success, failure);
    };


    $scope.registerUser = function(){
      console.log('YOYOYOYOYOYOYOYOYOYO-----', $scope.user);
      debugger;
      User.registerUser($scope.user).then(success, failure);
    };
  }]);
})();

