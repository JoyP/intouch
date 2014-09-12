(function(){
  'use strict';

  angular.module('intouch')
  .factory('Home', ['$http', function($http){

    $http.get('/home');
  }]);
})();

