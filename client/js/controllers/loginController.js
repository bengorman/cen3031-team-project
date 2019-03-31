angular.module('login').controller('LoginController', ['$scope', 'Users', '$location','$window',
  function($scope, $location, $window, Users) {
      $scope.form = {
        email: null,
	username: null,
        password: null
    };

    $scope.addUser = function() {
     $scope.users.push($scope.newUser);
     Users.create($scope.newUser).then(function() {
       $scope.newUser = {};
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
