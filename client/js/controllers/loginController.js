angular.module('login').controller('LoginController', ['$scope', 'Users', '$location','$window',
  function($scope, Users, $location, $window) {
      $scope.newUser = {
        email: null,
	      username: null,
        password: null
    };

    $scope.addUser = function() {
     Users.create($scope.newUser).then(function() {
       $scope.newUser = {};
       var newLocation = location.href.substring(0, location.href.lastIndexOf("/"));
       $window.location.href = newLocation+'/dashboard.html';
     }, function(err) {
       console.log(err);
     })
    };

    $scope.goLogin = function() {
	     var newLocation = location.href.substring(0, location.href.lastIndexOf("/"));
       $window.location.href = newLocation+'/dashboard.html';
    };
  }
]);
