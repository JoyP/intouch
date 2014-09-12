(function(){
  'use strict';

  angular.module('intouch')
  .controller('ShowCtrl', ['$scope', 'Show', 'Contact', function($scope, Show, Contact){
    $scope.contact = {};

    $scope.toggleContact = function(){
      $scope.showContact = !!!$scope.showContact;
    };

    $scope.updateContact = function(){
      Contact.update($scope.contact).then(function(response){
        $scope.contact = {};
      });
    };
  }]);
})();
