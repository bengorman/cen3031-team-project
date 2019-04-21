angular.module('tweets').controller('TweetController', ['$scope', 'Tweets', '$location','$window',/*'chart.js',*/
  function($scope, Tweets, $location, $window) {
    $scope.locationSearch = { name: "" };
    $scope.keywordSearch = { query: "" }
    $scope.trends = [];
    $scope.tweets = [];
    $scope.unavailable = false;
    $scope.currentLocation = { name: "" };
    $scope.currentKeyword = { query: "" }

    $scope.labels1 = $scope.trends.name;
    $scope.series1 = ['Location Trends'];
    $scope.data1 = $scope.trends.tweet_volume;
    
        $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    $scope.series = ['Series A', 'Series B'];
    $scope.data = [
      [65, 59, 80, 81, 56, 55, 40],
      [28, 48, 40, 19, 86, 27, 90]
    ];

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
        $scope.tweets = res.data.statuses;
        $scope.currentKeyword.query = $scope.keywordSearch.query;
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
