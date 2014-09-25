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
      Contact.addContactWithFiles($scope.contact, $scope.files).then(function(response){
        $scope.contact = response.data.contact;
        $scope.contacts.push($scope.contact);
        $scope.contact = {};
        $scope.toggleAdd();
      });
    };

    $scope.onFileSelect = function($files){
      $scope.files = $files;
    };

  }]);
})();

