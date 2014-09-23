(function(){
  'use strict';

  angular.module('intouch')
  .factory('User', ['$http', function($http){

    function loginUser(user){
      return $http.post('/login', user);
    }

    function registerUser(user){
      return $http.post('/register', user);
    }

    function logout(){
      return $http.delete('/logout');
    }

    return {registerUser:registerUser, loginUser:loginUser, logout:logout};
  }]);
})();

