/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/* Create your schema */
var userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  created_at: Date,
  updated_at: Date
});

/* create a 'pre' function that adds the updated_at (and created_at if not already there) property */
userSchema.pre('save', function(next) {
  var currentTime = new Date;
  this.updated_at = currentTime;
  if(!this.created_at)
  {
    this.created_at = currentTime;
  }
  next();
});

/* Use your schema to instantiate a Mongoose model */
var User = mongoose.model('User', userSchema, 'users');

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = User;
/*
after((done) => {
  mongoose.connection.close(done);
});
*/
