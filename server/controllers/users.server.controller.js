
/* Dependencies */
var mongoose = require('mongoose'),
    SHA256 = require('crypto-js/sha256'),
    User = require('../models/users.server.model.js');

/*
  In this file, you should use Mongoose queries in order to retrieve/add/remove/update listings.
  On an error you should send a 404 status code, as well as the error message.
  On success (aka no error), you should send the listing(s) as JSON in the response.

  HINT: if you are struggling with implementing these functions, refer back to this tutorial
  from assignment 3 https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
 */

/* Create a user */
exports.create = function(req, res) {

  /* Instantiate a User */
  var tempUser = new User(req.body)
  req.body.password = SHA256(req.body.password);
  var user = new User(req.body);
  /* Then save the user */
  user.save(function(err) {
    if(err) {
      var statusMessage = '';
      if (err.message.includes('username')) {
        statusMessage = 'There is already an account with this username';
      } else if (err.message.includes('email')) {
	statusMessage = 'There is already an account with this email';
      } else {
	statusMessage = 'Unknown error has occured';
      }
      res.status(400).send(statusMessage);
    } else {
      res.json(tempUser);
    }
  });
};

/* Sends a user that must be verified by matching username and password */
exports.read = function(req, res) {
  var tempUser = new User(req.body)
  User.findOne({username : tempUser.username}, function(err, user) {
    if(!user) {
      res.status(400).send(err);
    } else if(!(user.password == SHA256(tempUser.password))) {
      res.status(400).send(err);
    } else {
      res.json(tempUser);
    }
  });
};
  /*if(!user) {
    res.status(400).send(err);
  }
  if(!(user.password == SHA256(tempUser.password))) {
    res.status(400).send(err);
    console.log(user.password);
    console.log(SHA256(tempUser.password));
  }*/

/* Show the current listing 
exports.read = function(req, res) {
  /* send back the listing as json from the request 
  res.json(req.listing);
};*/

/* Update a listing 
exports.update = function(req, res) {
  var listing = req.listing;

  /** TODO ** 
  /* Replace the article's properties with the new properties found in req.body * 
  listing.code = req.body.code;
  listing.name = req.body.name;
  listing.address = req.body.address;

  /* Save the article * 
  listing.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(listing);
    }
  });
};*/

/* Delete a listing * 
exports.delete = function(req, res) {
  var listing = req.listing;

  /** TODO ** 
  /* Remove the article * 
  listing.remove(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(listing);
    }
  });
};*/

/* Retreive all the directory listings, sorted alphabetically by listing code * 
exports.list = function(req, res) {
  /** TODO ** 
  /* Your code here * 
  Listing.find({}).sort('code').exec(function(err, listings) {
    res.json(listings);
  });
};*/

/*
  Middleware: find a user by its ID, then pass it to the next request handler.

  Find the user using a mongoose query,
        bind it to the request object as the property 'user',
        then finally call next
 */
