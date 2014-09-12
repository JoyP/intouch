(function(){
  'use strict';

  angular.module('intouch')
  .factory('Show', ['$http', function($http){

    function update(contact){
      return $http.post('/show', contact);
    }
    return {update:update};
  }]);
})();

