(function(){
  'use strict';

  angular.module('intouch', ['ngRoute', 'LocalForageModule', 'angularFileUpload'])
  .config(['$routeProvider', '$httpProvider', '$localForageProvider', function($routeProvider, $httpProvider, $localForageProvider){
    $routeProvider
    .when('/', {templateUrl:'/views/home/home.html', controller:'HomeCtrl'})
    .when('/contacts', {templateUrl:'/views/contacts/contacts.html', controller:'ContactsCtrl'})
    .when('/contacts/:contactId', {templateUrl:'/views/show/show.html', controller:'ShowCtrl'})
    .when('/login', {templateUrl:'/views/login/login.html', controller:'LoginCtrl'})
    .when('/register', {templateUrl:'/views/login/login.html', controller:'LoginCtrl'})
    .when('/logout', {templateUrl:'/views/logout/logout.html', controller:'LogoutCtrl'})
    .otherwise({redirectTo:'/'});

    $httpProvider.interceptors.push('HttpInterceptor');
    $localForageProvider.config({name:'intouch', storeName:'cache', version:1.0});
  }]);
})();

