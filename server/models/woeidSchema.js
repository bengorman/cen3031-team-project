var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var WOEIDSchema = new Schema({
  name: String,
  placeType:{
    code: Number,
    name: String
  },
  url: String,
  parentid: Number,
  country: String,
  woeid: {
    type: Number,
    unique: true
  },
  countryCode: String
});

WOEIDSchema.pre('save', function(next) {
  /* your code here */
  var currentDate = new Date(); //gets the current date
  this.updated_at = currentDate; //Updates updated_at to current date
  if(!this.created_at) //If current date doesn't exist
    this.created_at = currentDate; //Set it to today
  next();
});


var WOEID = mongoose.model('WOEID', WOEIDSchema, 'woeids');

module.exports = WOEID;

