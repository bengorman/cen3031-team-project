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

    $scope.invalid = false;
    $scope.takenUsername = false;
    $scope.takenEmail = false;
    $scope.passwordMismatch = false;
    $scope.confirmPassword = { text: "" };
    $scope.terms = { agree: false, alert: false};

    $scope.addUser = function() {
      if($scope.confirmPassword.text != $scope.newUser.password) {
        $scope.passwordMismatch = true;
        return;
      } else {
        $scope.passwordMismatch = false;
      }
      if(!$scope.terms.agree) {
        $scope.terms.alert = true;
        return;
      } else {
        $scope.terms.alert = false;
      }
     Users.create($scope.newUser).then(function() {
       $scope.newUser = {};
       var newLocation = location.href.substring(0, location.href.lastIndexOf("/"));
       $window.location.href = newLocation+'/dashboard.html';
     }, function(err) {
       console.log(err);
       if(err.data === "There is already an account with this username") {
         $scope.takenUsername = true;
       } else {
         $scope.takenUsername = false;
       }
       if(err.data === "There is already an account with this email") {
         $scope.takenEmail = true;
       } else {
         $scope.takenEmail = false;
       }
     });
    };

    $scope.goLogin = function() {
      Users.verify($scope.user).then(function(res) {
        if(res.data.username === $scope.user.username && res.data.password === $scope.user.password) {
          $scope.invalid = false;
          var newLocation = location.href.substring(0, location.href.lastIndexOf("/"));
          $window.location.href = newLocation+'/dashboard.html';
        }
      }, function(err) {
        console.log(err);
        $scope.invalid = true;
      });
    };
  }
]);
