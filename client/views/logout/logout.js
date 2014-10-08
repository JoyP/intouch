(function(){
  'use strict';

  angular.module('intouch')
  .controller('LogoutCtrl', ['$scope', '$rootScope', '$location', 'User', function($scope, $rootScope, $location, User){
    User.logout().then(function(){
      $scope.email = null;
      $rootScope.$broadcast('logout');
      toastr.success('Successful logout.');
      $location.path('/');
    });
  }]);
})();
