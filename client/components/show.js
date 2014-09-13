(function(){
  'use strict';

  angular.module('intouch')
  .factory('Show', ['$http', function($http){

    function update(contact){
      return $http.post('/contacts/:id', contact);
    }
    return {update:update};
  }]);
})();
