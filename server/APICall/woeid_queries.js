var fs = require('fs'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    WOEID = require('../models/woeidSchema.js'),
    config = require('../config/config.js');


var findRequestedPlace = function() {
  /*
    Find the document that contains data corresponding to Library West,
    then log it to the console.
   */
  var place = 'worldwide';
  WOEID.findOne({name: (place.charAt(0).toUpperCase() + place.slice(1).toLowerCase())}, function(err,
woeid) {
    if(err) {
      console.log(err);
    }
    if(!woeid){
      console.log("Trends not avaliable for this place");
    } else {
      console.log(woeid);
    }
  });
};

var db = mongoose.connect('mongodb://User:CEN3031@ds219055.mlab.com:19055/tweet_data_app',
function(err) {
  if (err)
    console.log("Error connecting to database");

  console.log("Connection successful");
});

findRequestedPlace();

setTimeout(function() {
  db.disconnect();
}, 1000);

