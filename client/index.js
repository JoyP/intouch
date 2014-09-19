(function(){
  'use strict';

  angular.module('intouch', ['ngRoute'])
  .config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider){
    $routeProvider
    .when('/', {templateUrl:'/views/home/home.html', controller:'HomeCtrl'})
    .when('/contacts', {templateUrl:'/views/contacts/contacts.html', controller:'ContactsCtrl'})
    .when('/contacts/:contactId', {templateUrl:'/views/show/show.html', controller:'ShowCtrl'})
    .otherwise({redirectTo:'/'});

    $httpProvider.interceptors.push('HttpInterceptor');
  }]);
})();

