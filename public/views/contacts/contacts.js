(function(){
  'use strict';

  angular.module('intouch')
  .controller('ContactsCtrl', ['$scope', '$upload', 'Contact', function($scope, $upload, Contact){
    $scope.sort = 'lname';
    $scope.contact = {};
    $scope.contacts = [];

    Contact.findContacts().then(function(response){
      $scope.contacts = response.data.contacts;
    });

    $scope.toggleAdd = function(){
      $scope.showAdd = !!!$scope.showAdd;
    };

    $scope.add = function(){
      Contact.create($scope.contact).then(function(response){
      // **** this is where the form data (fields + files) gets sent to server side
      // this second block is original inTouch controller
        $scope.contacts.push(response.data.contact);
        $scope.contact = {};
        $scope.toggleAdd();
      });
    };

    $scope.onFileSelect = function($files){
      for (var i = 0; i < $files.length; i++) {
        var file = $files[i];
        $scope.upload = $upload.upload({
          url: '/contacts',
          method: 'POST',
          //headers: {'header-key': 'header-value'},
          withCredentials: true,
          data: {myObj: $scope.myModelObj},
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
      }
    };

  }]);
})();

