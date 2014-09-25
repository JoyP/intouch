(function(){
  'use strict';

  angular.module('intouch')
  .controller('ShowCtrl', ['$scope', '$location', 'Show', 'Contact', '$routeParams', function($scope, $location, Show, Contact, $routeParams){

    $scope.toggleContact = function(){
      $scope.showContact = !!!$scope.showContact;
    };

    $scope.updateContact = function(){
      Show.update($scope.contact).then(function(response){
        $scope.toggleContact();
        $location.path('/contacts');
      });
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
