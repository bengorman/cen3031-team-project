angular.module('login').controller('LoginController', ['$scope', '$location','$window',
  function($scope, $location, $window) {
      $scope.form = {
        username: null,
        password: null
    };

    $scope.goLogin = function() {
	var newLocation = location.href.substring(0, location.href.lastIndexOf("/"));
        $window.location.href = newLocation+'/dashboard.html';
    };
  }
]);
