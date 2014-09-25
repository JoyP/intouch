(function(){
  'use strict';

  angular.module('intouch')
  .factory('Contact', ['$http', '$upload', function($http, $upload){

    function create(contact){
      console.log('contact in contactfactory>>>>>>>>', contact);
      return $http.post('/contacts', contact);
    }

    function findContacts(){
      return $http.get('/contacts');
    }

    function addContactWithFiles(contact, files, cb){
      var file = files[0];
      $upload.upload({
        url: '/contacts',
        method: 'POST',
        //headers: {'header-key': 'header-value'},
        withCredentials: true,
        data: {contact: contact},
        file: file,
        fileName: 'photo.jpg' // or ['1.jpg', '2.jpg', ...] // to modify the name of the file(s)
        // customize file formData name ('Content-Disposition'), server side file variable name.
        //fileFormDataName: myFile, //or a list of names for multiple files (html5). Default is 'file'
        // customize how data is added to formData. See #40#issuecomment-28612000 for sample code
        //formDataAppender: function(formData, key, val){}
      });
      //.error(...)
      //.then(success, error, progress);
      // access or attach event listeners to the underlying XMLHttpRequest
      // .xhr(funtion(xhr){xhr.upload.addeventListener(...)})

      //console.log('contact in addContactWithFiles right before callback>>>>>>>', contact);
      cb(contact);
      return $http.get('/contacts', contact);
    }

    return {create:create, findContacts:findContacts, addContactWithFiles:addContactWithFiles};
  }]);
})();

