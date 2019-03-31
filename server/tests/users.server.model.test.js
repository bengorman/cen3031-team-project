var should = require('should'),
    mongoose = require('mongoose'),
    User = require('../models/users.server.model'),
    SHA256 = require('crypto-js/sha256')
    config = require('../config/config');

var listing, id;

user =  {
  email: "test1@gmail.com",
  username: "test1",
  password: "password"
}

describe('User Schema Unit Tests', function() {

  before(function(done) {
    mongoose.connect(config.db.uri);
    done();
  });

  describe('Saving to database', function() {
    /*
      Mocha's default timeout for tests is 2000ms. To ensure that the tests do not fail
      prematurely, we can increase the timeout setting with the method this.timeout()
     */
    this.timeout(10000);

    it('throws an error when username not provided', function(done){
      new User({
        email: user.email,
        password: user.password
      }).save(function(err){
        should.exist(err);
        done();
      })
    });

    it('throws an error when email not provided', function(done){
      new User({
        username: user.username,
        password: user.password
      }).save(function(err){
        should.exist(err);
        done();
      })
    });

    it('throws an error when password not provided', function(done){
      new User({
        username: user.username,
        email: user.email
      }).save(function(err){
        should.exist(err);
        done();
      })
    });

    it('saves properly when all three properties provided', function(done){
      user.password = SHA256(user.password);
      var newUser = new User(user);
      new User(newUser).save(function(err, listing){
        should.not.exist(err);
        id = user._id;
        done();
      });
    });

  });

  /*afterEach(function(done) {
    if(id) {
      User.remove({ _id: id }).exec(function() {
        id = null;
        done();
      });
    } else {
      done();
    }
  });*/
});
