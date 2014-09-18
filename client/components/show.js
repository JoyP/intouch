(function(){
  'use strict';

  angular.module('intouch')
  .factory('Show', ['$http', function($http){

    function findById(contactId){
      return $http.get('/contacts/' + contactId);
    }

    function update(contact){
      return $http.post('/contacts/' + contact._id, contact);
    }

    return {update:update, findById:findById};
  }]);
})();
