angular.module('tweets').controller('TweetController', ['$scope', 'Tweets', '$location','$window','$document',
  function($scope, Tweets, $location, $window, $document) {
    $scope.locationSearch = { name: "" };
    $scope.keywordSearch = { query: "" }
    $scope.trends = [];
    $scope.tweets = [];
    $scope.unavailable = false;
    $scope.currentLocation = { name: "" };
    $scope.currentKeyword = { query: "" };

    $scope.labels1 = $scope.trends.name;
    $scope.series1 = ['Location Trends'];
    $scope.data1 = $scope.trends.tweet_volume;

    $scope.generateTrendBarGraph = function() {
      if ($('#trend_bar').length) {
        var names = $scope.trends.map(a => a.name);
        var volumes = $scope.trends.map(b => b.tweet_volume);
        var ctx = document.getElementById("trend_bar").getContext('2d');
        var myChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: names.slice(0,10),
            datasets: [{
              data: volumes.slice(0,10),
              backgroundColor: "rgba(89, 105, 255,0.5)",
              borderColor: "rgba(89, 105, 255,0.7)",
              borderWidth: 1,
            }]
          },
          options: {
            scales: {
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Tweet Volume',
                }
              }],
              xAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Trends',
                }
              }]
            },
            legend: {
              display: false,
              position: 'bottom',
              labels: {
                fontColor: '#71748d',
                fontFamily: 'Circular Std Book',
                fontSize: 15,
              }
            },
            scales: {
              xAxes: [{
                ticks: {
                  fontSize: 10,
                  fontFamily: 'Circular Std Book',
                  fontColor: '#71748d',
                  autoSkip: false,
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Trends',
                }
              }],
              yAxes: [{
                ticks: {
                  fontSize: 10,
                  fontFamily: 'Circular Std Book',
                  fontColor: '#71748d',
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Tweet Volume',
                }
              }]
            }
          }
        });
      }
    };

    $scope.generateKeywordRetweetBarGraph = function() {
      if ($('#keyword_retweet_bar').length) {
        var handles = $scope.tweets.map(a => a.user.name);
        var retweets = $scope.tweets.map(b => b.retweet_count);
        var ctx = document.getElementById("keyword_retweet_bar").getContext('2d');
        var myChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: handles,
            datasets: [{
              data: retweets,
              backgroundColor: "rgba(89, 105, 255,0.5)",
              borderColor: "rgba(89, 105, 255,0.7)",
              borderWidth: 1,
            }]
          },
          options: {
            scales: {
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Retweets',
                }
              }],
              xAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Username',
                }
              }]
            },
            legend: {
              display: false,
              position: 'bottom',
              labels: {
                fontColor: '#71748d',
                fontFamily: 'Circular Std Book',
                fontSize: 15,
              }
            },
            scales: {
              xAxes: [{
                ticks: {
                  fontSize: 10,
                  fontFamily: 'Circular Std Book',
                  fontColor: '#71748d',
                  autoSkip: false,
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Username',
                }
              }],
              yAxes: [{
                ticks: {
                  fontSize: 10,
                  fontFamily: 'Circular Std Book',
                  fontColor: '#71748d',
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Retweets',
                }
              }]
            }
          }
        });
      }
    };

    $scope.generateKeywordFavoriteBarGraph = function() {
      if ($('#keyword_like_bar').length) {
        var handles = $scope.tweets.map(a => a.user.name);
        var favorites = $scope.tweets.map(b => b.favorite_count);
        var ctx = document.getElementById("keyword_like_bar").getContext('2d');
        var myChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: handles,
            datasets: [{
              data: favorites,
              backgroundColor: "rgba(89, 105, 255,0.5)",
              borderColor: "rgba(89, 105, 255,0.7)",
              borderWidth: 1,
            }]
          },
          options: {
            scales: {
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Favorites',
                }
              }],
              xAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Username',
                }
              }]
            },
            legend: {
              display: false,
              position: 'bottom',
              labels: {
                fontColor: '#71748d',
                fontFamily: 'Circular Std Book',
                fontSize: 15,
              }
            },
            scales: {
              xAxes: [{
                ticks: {
                  fontSize: 10,
                  fontFamily: 'Circular Std Book',
                  fontColor: '#71748d',
                  autoSkip: false,
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Username',
                }
              }],
              yAxes: [{
                ticks: {
                  fontSize: 10,
                  fontFamily: 'Circular Std Book',
                  fontColor: '#71748d',
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Favorites',
                }
              }]
            }
          }
        });
      }
    };

    $scope.getTrends = function() {
      Tweets.searchLocation($scope.locationSearch).then(function(res) {
        $scope.unavailable = false;
        $scope.currentLocation.name = $scope.locationSearch.name;
        $scope.trends = res.data;
        $scope.trends.sort((a,b) => (a.tweet_volume > b.tweet_volume) ? -1 : ((b.tweet_volume > a.tweet_volume) ? 1 : 0));
	      $scope.generateTrendBarGraph();
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
        $scope.tweets.sort((a,b) => (a.retweet_count > b.retweet_count) ? -1 : ((b.retweet_count > a.retweet_count) ? 1 : 0));
        $scope.generateKeywordRetweetBarGraph();
        $scope.tweets.sort((a,b) => (a.favorite_count > b.favorite_count) ? -1 : ((b.favorite_count > a.favorite_count) ? 1 : 0));
        $scope.generateKeywordFavoriteBarGraph();
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
