angular.module('login').controller('LoginController', ['$scope', 'Users', '$location','$window',
  function($scope, Users, $location, $window) {
    $scope.newUser = {
      email: null,
      username: null,
      password: null
    };

    $scope.user = {
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
     });
    };

    $scope.goLogin = function() {
      Users.verify($scope.user).then(function(res) {
        if(res.data.username === $scope.user.username && res.data.password === $scope.user.password) {
          var newLocation = location.href.substring(0, location.href.lastIndexOf("/"));
          $window.location.href = newLocation+'/dashboard.html';
        }
      }, function(err) {
        console.log(err);
      });
    };
  }
]);
