(function(){
  'use strict';

  angular.module('intouch')
  .factory('Login', ['$http', function($http){

    $http.get('/login');
  }]);
})();

