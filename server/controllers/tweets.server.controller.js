
var Twitter = require('twitter'),
    keys = require('../APICall/keys.js'),
    T = new Twitter(keys),
    mongoose = require('mongoose'),
    WOEID = require('../models/woeidSchema.js');


exports.location = function(req, res) {
  var place = req.body.name; //Can be changed via user input
  WOEID.findOne({name: (place.charAt(0).toUpperCase() + place.slice(1).toLowerCase())}, function(err, woeid) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    }
    if(!woeid){
      console.log("Trends not avaliable for this place");
      res.status(400).send(err);
    } else {
      var params2 = {
        id: woeid.woeid //woeid
      }
      T.get('trends/place', params2, function(err, data, response) {
        if(!err){
          var trends = data[0].trends;
          res.json(trends);
	} else {
          console.log(err)
	  res.status(400).send(err);
        }
      })
    }
  });
};



exports.keyword = function(req, res) {
  // Set up your search parameters
  var params = {
    q: req.body.query, //query parameter
    count: 5, //number of returned tweets
    result_type: 'popular' //popular, recent, or mixed
  }

  T.get('search/tweets', params, function(err, data, response) {
    if(!err){
      var statuses = data.statuses;
      res.json(statuses);
    } else {
        console.log(err);
        res.status(400).send(err);
    }
  })
};
