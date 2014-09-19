(function(){
  'use strict';

  angular.module('intouch')
  .controller('ShowCtrl', ['$scope', 'Show', 'Contact', '$routeParams', function($scope, Show, Contact, $routeParams){

    $scope.toggleContact = function(){
      $scope.showContact = !!!$scope.showContact;
    };

    $scope.updateContact = function(){
      Contact.update($routeParams.contactId).then(function(response){
        $scope.toggleContact();
      });
    };
    Show.findById($routeParams.contactId).then(function(response){
      $scope.contact = response.data.contact;
    });
  }]);
})();
