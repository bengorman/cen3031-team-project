angular.module('login', []).factory('Users', function($http) {
  var methods = {
  	create: function(user) {
  	  return $http.post('https://twitter-analytics-dashboard.herokuapp.com/api/users/', user);
    },

    verify: function(user) {
      return $http.put('https://twitter-analytics-dashboard.herokuapp.com/api/users/', user);
    }
  };

  return methods;
});
