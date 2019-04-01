angular.module('tweets', []).factory('Tweets', function($http) {
  var methods = {
  	searchLocation: function(location) {
  	  return $http.post('https://twitter-analytics-dashboard.herokuapp.com/api/tweets/', location);
    },

    searchKeyword: function(keyword) {
      return $http.put('https://twitter-analytics-dashboard.herokuapp.com/api/tweets/', keyword);
    }
  };

  return methods;
});
