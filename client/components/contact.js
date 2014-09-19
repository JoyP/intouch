(function(){
  'use strict';

  angular.module('intouch')
  .factory('Contact', ['$http', function($http){

    function create(contact){
      return $http.post('/contacts', contact);
    }

    function all(){
      return $http.get('/contacts');
    }

    return {create:create, all:all};
  }]);
})();

