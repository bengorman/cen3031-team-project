angular.module('tweets').controller('TweetController', ['$scope', 'Tweets', '$location','$window',
  function($scope, Tweets, $location, $window) {
    $scope.search = "";
    $scope.trends = [];
    $scope.tweets = [];

    $scope.getTrends() = function() {
      Tweets.searchLocation($scope.search).then(function(res) {
        console.log(res.data);
        trends = res.data;
      }, function(err) {
        console.log(err);
      });
    };

    $scope.getTweets() = function() {
      Tweets.searchKeyword($scope.search).then(function(res) {
        console.log(res.data);
        tweets = res.data;
      }, function(err) {
        console.log(err);
      });
    };
  }
]);
