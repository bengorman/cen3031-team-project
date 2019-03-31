var Twitter = require('twitter');
var keys = require('./keys.js');
var T = new Twitter(keys);

// Set up your search parameters
var params = {
  q: 'basketball', //query parameter
  count: 5, //number of returned tweets
  result_type: 'popular' //popular, recent, or mixed
}

// Search for tweets with the query parameter of q above
/*T.get('search/tweets', params, function(err, data, response) {
  if(!err){
    for(var i = 0; i < data.statuses.length; i++)
    {
      var obj = data.statuses[i];
      console.log(obj);
    }
  } else {
      console.log(err);
  }
})*/

var params2 = {
  id: 1 //woeid
}

//Get trending topics from location based on woeid
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

