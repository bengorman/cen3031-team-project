var should = require('should'),
    request = require('supertest'),
    express = require('../config/express'),
    User = require('../models/users.server.model.js');

/* Global variables */
var app, agent, user, id;

/* Unit tests for testing server side routes for the listings API */
describe('User CRUD tests', function() {

  this.timeout(10000);

  before(function(done) {
    app = express.init();
    agent = request.agent(app);

    done();
  });

  /*it('should it able to retrieve all listings', function(done) {
    agent.get('/api/listings')
      .expect(200)
      .end(function(err, res) {
        should.not.exist(err);
        should.exist(res);
        res.body.should.have.length(147);
        done();
      });
  });
  it('should be able to retrieve a single listing', function(done) {
    Listing.findOne({name: 'Library West'}, function(err, listing) {
      if(err) {
        console.log(err);
      } else {
        agent.get('/api/listings/' + listing._id)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);
            should.exist(res);
            res.body.name.should.equal('Library West');
            res.body.code.should.equal('LBW');
            res.body.address.should.equal('1545 W University Ave, Gainesville, FL 32603, United States');
            res.body._id.should.equal(listing._id.toString());
            done();
          });
      }
    });
  });*/

  it('Should be able to save a user', function(done) {
    var user = {
      email: 'test2@yahoo.com',
      username: 'test2',
      password: 'bigbootyjudy'
    };
    agent.post('/api/users')
      .send(user)
      .expect(200)
      .end(function(err, res) {
        should.not.exist(err);
        should.exist(res.body._id);
        res.body.username.should.equal('test2');
        res.body.email.should.equal('test2@yahoo.com');
        res.body.password.should.equal('bigbootyjudy');
        id = res.body._id;
        done();
      });
  });

  it('Should be able to authentiacate a user based on username and password', function(done) {
    var user = {
      email: 'test2@yahoo.com',
      username: 'test2',
      password: 'bigbootyjudy'
    };
    agent.get('/api/users')
      .send(user)
      .expect(200)
      .end(function(err, res) {
        should.not.exist(err);
        should.exist(res.body._id);
        res.body.username.should.equal('test2');
        res.body.email.should.equal('test2@yahoo.com');
        res.body.password.should.equal('bigbootyjudy');
        id = res.body._id;
        done();
      });
  });

  /*it('should be able to update a listing', function(done) {
    var updatedListing = {
      code: 'CEN3031',
      name: 'Introduction to Software Engineering',
      address: '432 Newell Dr, Gainesville, FL 32611'
    };

    agent.put('/api/listings/' + id)
      .send(updatedListing)
      .expect(200)
      .end(function(err, res) {
        should.not.exist(err);
        should.exist(res.body._id);
        res.body.name.should.equal('Introduction to Software Engineering');
        res.body.code.should.equal('CEN3031');
        res.body.address.should.equal('432 Newell Dr, Gainesville, FL 32611');
        done();
      });
  });

  it('should be able to delete a listing', function(done) {
    agent.delete('/api/listings/' + id)
      .expect(200)
      .end(function(err, res) {
        should.not.exist(err);
        should.exist(res);

        agent.get('/api/listings/' + id) 
          .expect(400)
          .end(function(err, res) {
            id = undefined;
            done();
          });
      })
  });*/
});
