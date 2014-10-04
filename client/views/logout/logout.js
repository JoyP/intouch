(function(){
  'use strict';

  angular.module('intouch')
  .controller('LogoutCtrl', ['$scope', '$location', 'User', function($scope, $location, User){
    User.logout().then(function(){
      $scope.email = null;
      toastr.success('Successful logout.');
      $location.path('/');
    });
  }]);
})();
