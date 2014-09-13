(function(){
  'use strict';

  angular.module('intouch')
  .controller('ShowCtrl', ['$scope', 'Show', 'Contact', function($scope, Show, Contact){

    $scope.contact = {};

    $scope.toggleContact = function(){
      $scope.showContact = !!!$scope.showContact;
    };

    Contact.findById().then(function(response){
      console.log('response in v/s/show.js>>>>>>>>>>>', response);
      $scope.contact = response.data.contact;
    });


    $scope.updateContact = function(){
      Contact.update($scope.contact).then(function(response){
        $scope.contact = {};
      });
    };
  }]);
})();
