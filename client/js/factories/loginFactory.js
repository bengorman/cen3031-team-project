angular.module('login', []).factory('Users', function($http) {
  var methods = {
  	create: function(user) {
  	  return $http.post('http://localhost:8080/api/users/', user);
    },

    verify: function(user) {
      return $http.put('http://localhost:8080/api/users/', user);
    }
  };

  return methods;
});
