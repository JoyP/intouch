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
      console.log('$scope.files in contact controller>>>>>>>>', $scope.files);
      Contact.addContactWithFiles($scope.contact, $scope.files, function(response){
        console.log('response in contact controller>>>>>>', response);
        console.log('$scope.contact in contact controller>>>>>>>>>>>>>>>', $scope.contact);
        $scope.contacts.push($scope.contact);
        $scope.contact = {};
        $scope.toggleAdd();
      });
    };

    $scope.onFileSelect = function($files){
      console.log('$files in contact controller>>>>>>>>', $files);
      $scope.files = $files;
    };

  }]);
})();

