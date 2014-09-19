(function(){
  'use strict';

  angular.module('intouch')
  .factory('Show', ['$http', function($http){

    function findById(contactId){
      return $http.get('/contacts/' + contactId);
    }

    function update(contactId){
      return $http.post('/contacts/' + contactId);
    }

    return {update:update, findById:findById};
  }]);
})();
