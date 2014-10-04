(function(){
  'use strict';

  angular.module('intouch')
  .controller('ShowCtrl', ['$scope', '$location', '$http', '$window', 'Show', 'Contact', '$routeParams', function($scope, $location, $http, $window, Show, Contact, $routeParams){

    $scope.toggleContact = function(){
      $scope.showContact = !!!$scope.showContact;
    };

    $scope.update = function(){
      Show.updateContact($scope.contact, $scope.files).then(function(response){
        $scope.toggleContact();
        // reload page so that updated photo is displayed
        $window.location.reload();
      });
    };

    $scope.onFileSelect = function($files){
      $scope.files = $files;
    };

    Show.findById($routeParams.contactId).then(function(response){
      $scope.contact = response.data.contact;
    });

    $scope.deleteContact = function(contactId){
      Show.deleteContact(contactId).then(function(response){
        $location.path('/contacts');
      });
    };

  }]);
})();
