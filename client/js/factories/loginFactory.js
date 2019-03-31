angular.module('login', []).factory('User', function($http) {
  var methods = {
  	create: function(user) {
  	  return $http.post('localhost:8080/api/users/', user);
    },

    verify: function(user) {
      return $http.get('localhost:8080/api/users/', user);
    }
  };

  return methods;
});
