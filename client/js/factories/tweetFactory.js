angular.module('tweets', []).factory('Tweets', function($http) {
  var methods = {
  	searchLocation: function(location) {
  	  return $http.post('http://localhost:8080/api/users/', location);
    },

    searchKeyword: function(keyword) {
      return $http.put('http://localhost:8080/api/users/', keyword);
    }
  };

  return methods;
});
