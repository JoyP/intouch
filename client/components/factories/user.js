(function(){
  'use strict';

  angular.module('intouch')
  .factory('User', ['$http', function($http){

    function loginUser(user){
      $http.post('/login', user);
    }

    return {loginUser:loginUser};
  }]);
})();

