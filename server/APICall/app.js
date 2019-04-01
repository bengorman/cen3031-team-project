var Twitter = require('twitter'),
    keys = require('./keys.js'),
    T = new Twitter(keys),
    mongoose = require('mongoose'),
    WOEID = require('../models/woeidSchema.js');



// Search for tweets with the query parameter of q below
var search = function () {
  // Set up your search parameters
  var params = {
    q: 'Spurs', //query parameter
    count: 5, //number of returned tweets
    result_type: 'popular' //popular, recent, or mixed
  }

  T.get('search/tweets', params, function(err, data, response) {
    if(!err){
      for(var i = 0; i < data.statuses.length; i++)
      {
        var obj = data.statuses[i];
        console.log(obj.user.name);
      }
    } else {
        console.log(err);
    }
  })
};



//Get trending topics based on location
var findTrends = function() {
  var place = 'orLANDO'; //Can be changed via user input
  WOEID.findOne({name: (place.charAt(0).toUpperCase() + place.slice(1).toLowerCase())}, function(err,
  woeid) {
    if(err) {
      console.log(err);
    }
    if(!woeid){
      console.log("Trends not avaliable for this place");
    } else {
      var params2 = {
      id: woeid.woeid //woeid
      }
      T.get('trends/place', params2, function(err, data, response) {
        if(!err){
          var trends = data[0].trends;
          for(var i = 0; i<trends.length; i++)
          {
            var obj = trends[i];
            console.log(obj);
          }
        } else {
          console.log(err)
        }
      })
    }
  });
};



var db = mongoose.connect('mongodb://User:CEN3031@ds219055.mlab.com:19055/tweet_data_app',
function(err) {
  if (err)
    console.log("Error connecting to database");

  console.log("Connection successful");
});

search();
//findTrends();

setTimeout(function() {
  db.disconnect();
}, 1000);
