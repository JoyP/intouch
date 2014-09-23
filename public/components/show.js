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

    function deleteContact(contactId){
      console.log('contactId in show factory>>>>>', contactId);
      return $http.delete('/contacts/'+ contactId);
    }

    return {update:update, findById:findById, deleteContact:deleteContact};
  }]);
})();
