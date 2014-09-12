(function(){
  'use strict';

  angular.module('intouch')
  .controller('LoginCtrl', ['$scope', 'Login', function($scope, Login){
    $scope.hideRegister = true;

    $scope.toggleRegister = function(){
      $scope.hideRegister = !!!$scope.hideRegister;
      $('#toggleReg').fadeIn(1000);
    };


  }]);
})();

