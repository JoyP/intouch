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

      addContactWithFiles($scope.contact, $scope.files, function(err, response){
        console.log('err >>>>>>', err);
        console.log('response >>>>>>>', response);
        console.log('response.data.contact>>>>>>', response.data.contact);
        // $scope.contacts.push(response.data.contact);
        $scope.contacts.push($scope.contact);
        $scope.contact = {};
        $scope.toggleAdd();
      });
    };

    $scope.onFileSelect = function($files){
      console.log($files);
      $scope.files = $files;
    };

    // this function could be made into its own service
    function addContactWithFiles(contact, $files, cb){
      var file = $files[0];
      console.log('addContactWithFiles >>>>>>');
      $scope.upload = $upload.upload({
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
      cb(contact);
    }

  }]);
})();

