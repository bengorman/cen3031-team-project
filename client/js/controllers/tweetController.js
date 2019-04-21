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
		var names = $scope.trends.map(a => a.name);
		var volumes = $scope.trends.map(b => b.tweet_volume);
                var ctx = document.getElementById("chartjs_bar").getContext('2d');
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
                            fontSize: 10,
                        }
                    },

                    scales: {
                        xAxes: [{
                            ticks: {
                                fontSize: 10,
                                fontFamily: 'Circular Std Book',
                                fontColor: '#71748d',
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

    $scope.getTrends = function() {
      Tweets.searchLocation($scope.locationSearch).then(function(res) {
        $scope.unavailable = false;
        $scope.currentLocation.name = $scope.locationSearch.name;
        $scope.trends = res.data;
        $scope.trends.sort((a,b) => (a.tweet_volume > b.tweet_volume) ? 1 : ((b.tweet_volume > a.tweet_volume) ? -1 : 0));
        console.log($scope.trends);
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
