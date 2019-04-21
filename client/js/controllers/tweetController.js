angular.module('tweets').controller('TweetController', ['$scope', 'Tweets', '$location','$window','$document',
  function($scope, Tweets, $location, $window, $document) {
    $scope.locationSearch = { name: "" };
    $scope.keywordSearch = { query: "" }
    $scope.trends = [];
    $scope.tweets = [];
    $scope.unavailable = false;
    $scope.currentLocation = { name: "" };
    
    $scope.labels1 = $scope.trends.name;
    $scope.series1 = ['Location Trends'];
    $scope.data1 = $scope.trends.tweet_volume;
    
    $scope.generateGraph = function() {
        if ($('#chartjs_bar').length) {
                var ctx = document.getElementById("chartjs_bar").getContext('2d');
                var myChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['test', 'test2'],
                        datasets: [{
                            label: $scope.trends[0].name,
                            data: [$scope.trends[0].tweet_volume],
                           backgroundColor: "rgba(89, 105, 255,0.5)",
                                    borderColor: "rgba(89, 105, 255,0.7)",
                            borderWidth: 2
                        }, {
                            label: $scope.trends[1].name,
                            data: [$scope.trends[1].tweet_volume],
                           backgroundColor: "rgba(255, 64, 123,0.5)",
                                    borderColor: "rgba(255, 64, 123,0.7)",
                            borderWidth: 2
                        }]
                    },
                    options: {
                        scales: {
                            yAxes: [{

                            }]
                        },
                             legend: {
                        display: true,
                        position: 'bottom',

                        labels: {
                            fontColor: '#71748d',
                            fontFamily: 'Circular Std Book',
                            fontSize: 14,
                        }
                    },

                    scales: {
                        xAxes: [{
                            ticks: {
                                fontSize: 14,
                                fontFamily: 'Circular Std Book',
                                fontColor: '#71748d',
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                fontSize: 14,
                                fontFamily: 'Circular Std Book',
                                fontColor: '#71748d',
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
	$scope.generateGraph();
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
