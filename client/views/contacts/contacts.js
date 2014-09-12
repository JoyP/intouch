(function(){
  'use strict';

  angular.module('intouch')
  .controller('ContactsCtrl', ['$scope', 'Contact', function($scope, Contact){
    $scope.sort = 'lname';
    $scope.contact = {};
    $scope.contacts = [];

    Contact.all().then(function(response){
      $scope.contacts = response.data.contacts;
    });

    $scope.add = function(){
      Contact.create($scope.contact).then(function(response){
        $scope.contacts.push(response.data.contact);
        $scope.contact = {};
      });
    };
  }]);
})();

