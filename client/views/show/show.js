(function(){
  'use strict';

  angular.module('intouch')
  .controller('ShowCtrl', ['$scope', '$location', '$http', '$window', 'Show', 'Contact', '$routeParams', function($scope, $location, $http, $window, Show, Contact, $routeParams){

    $scope.toggleContact = function(){
      $scope.showContact = !!!$scope.showContact;
    };

    $scope.update = function(){
      Show.updateContact($scope.contact, $scope.files).then(function(response){
        //$scope.$root.$eval(function(){
        Show.findById($routeParams.contactId).then(function(response){
          $scope.contact = response.data.contact;
          $scope.toggleContact();
          //$scope.reload =function(){
          //  $window.location.reload();
          //};
           //return $http.get('/contacts/' + $scope.contact._id);
        });
        //});
         //return $http.get('/contacts/' + contactId);
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
