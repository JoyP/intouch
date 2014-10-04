(function(){
  'use strict';

  angular.module('intouch')
  .factory('Show', ['$http', '$upload',  function($http, $upload){

    function findById(contactId){
      return $http.get('/contacts/' + contactId);
    }

    function deleteContact(contactId){
      return $http.delete('/contacts/'+ contactId);
    }

    function updateContact(contact, files){
      // prevents errors if no file is selected
      var file = files ? files[0] : null;
      return $upload.upload({
        url: '/contacts/:id',
        method: 'POST',
        withCredentials: true,
        data: {contact: contact},
        file: file,
        fileName: 'photo.jpg'
      });
    }

    return {updateContact:updateContact, findById:findById, deleteContact:deleteContact};
  }]);
})();
