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
      Contact.create($scope.contact).then(function(response){
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
          // headers: {'header-key': 'header-value'},
          withCredentials: true,
          data: {myObj: $scope.myModelObj},
          file: file,
          fileName: 'photo.jpg' // see Farid for addl options, changing file name
          //fileFormDataName: ...
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

