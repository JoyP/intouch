(function(){
  'use strict';

  angular.module('intouch')
  .factory('Show', ['$http', function($http){

    function findById(contact){
      console.log('contact in .factory findById>>>>>>>>>>', contact);
      this.contact = contact;
      console.log('contact in .factory findById>>>>>>>>>>', contact);
      return $http.get('/contacts/:id', this.contact);
    }

    function update(contact){
      return $http.post('/contacts/:id', contact);
    }

    return {update:update, findById:findById};
  }]);
})();
