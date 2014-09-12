(function(){
  'use strict';

  angular.module('intouch', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider){
    $routeProvider
    .when('/', {templateUrl:'/views/home/home.html', controller:'HomeCtrl'})
    .when('/contacts', {templateUrl:'/views/contacts/contacts.html', controller:'ContactsCtrl'})
    .otherwise({redirectTo:'/'});
  }]);
})();

