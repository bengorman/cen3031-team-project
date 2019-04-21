angular.module('tweets').controller('TweetController', ['$scope', 'Tweets', '$location','$window','chart.js'
  function($scope, Tweets, $location, $window) {
    $scope.locationSearch = { name: "" };
    $scope.keywordSearch = { query: "" };
    $scope.trends = [];
    $scope.tweets = [];
    $scope.unavailable = false;
    $scope.currentLocation = { name: "" };
    
    $scope.labels1 = $scope.trends.name;
    $scope.series1 = ['Location Trends'];
    $scope.data1 = $scope.trends.tweet_volume;

    $scope.getTrends = function() {
      Tweets.searchLocation($scope.locationSearch).then(function(res) {
        $scope.unavailable = false;
        $scope.currentLocation.name = $scope.locationSearch.name;
        $scope.trends = res.data;
      }, function(err) {
        console.log(err);
        if(err.status === 400) {
          $scope.unavailable = true;
        }
      });
    };

    $scope.getTweets = function() {
      Tweets.searchKeyword($scope.keywordSearch).then(function(res) {
        console.log(res.data);
        tweets = res.data.statuses;
        console.log(tweets);
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
