(function(){
  'use strict';

  angular.module('intouch')
  .controller('ContactsCtrl', ['$scope', 'Contact', '$upload', function($scope, Contact, $upload){
    $scope.sort = 'lname';
    $scope.contact = {};
    $scope.contacts = [];

    Contact.all().then(function(response){
      $scope.contacts = response.data.contacts;
    });

    $scope.toggleAdd = function(){
      $scope.showAdd = !!!$scope.showAdd;
    };

    $scope.add = function(){
      // **** this is where the form data (fields + files) gets sent to server side
      // this second block is original inTouch controller
      Contact.create($scope.contact).then(function(response){
        $scope.contacts.push(response.data.contact);
        $scope.contact = {};
      });
    };

    $scope.findContact = function(c){
      Contact.findById(c._id).then(function(response){
        $scope.contact = response.data.contact;
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
        // access or attach event listeners to the underlying XMLHttpRequest.
        //.xhr(function(xhr){xhr.upload.addEventListener(...)})
      }
    };

  }]);
})();

