angular.module('tweets').controller('TweetController', ['$scope', 'Tweets', '$location','$window',
  function($scope, Tweets, $location, $window) {
    $scope.locationSearch = { name: "" };
    $scope.keywordSearch = { query: "" }
    $scope.trends = [];
    $scope.tweets = [];

    $scope.getTrends = function() {
      console.log("SUBMIT");
      Tweets.searchLocation($scope.locationSearch).then(function(res) {
        console.log(res.data);
        $scope.trends = res.data;
      }, function(err) {
        console.log(err);
      });
    };

    $scope.getTweets = function() {
      Tweets.searchKeyword($scope.keywordSearch).then(function(res) {
        console.log(res.data);
        tweets = res.data;
      }, function(err) {
        console.log(err);
      });
    };
  }
]).filter("nullToEnd", function () {
    return function (array, key) {
        var present = array.filter(function (item) {
            return item[key];
        });
        var empty = array.filter(function (item) {
            return !item[key]
        });
        return present.concat(empty);
    };
});
