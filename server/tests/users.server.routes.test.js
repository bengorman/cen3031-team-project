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
    agent.put('/api/users')
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

  it('Should be able to throw proper error with duplicate username on user creation', function(done) {
    var user = {
      email: 'test2@yahoo.com',
      username: 'test2',
      password: 'bigbootyjudy'
    };
    agent.post('/api/users')
      .send(user)
      .expect(400)
      .end(function(err, res) {
	should.exist(res);
	res.error.text.should.equal('There is already an account with this username');
	done();
    });
  });

  it('Should be able to throw proper error with duplicate email on user creation', function(done) {
    var user = {
      email: 'test2@yahoo.com',
      username: 'test246813579',
      password: 'bigbootyjudy'
    };
    agent.post('/api/users')
      .send(user)
      .expect(400)
      .end(function(err, res) {
        should.exist(res);
        res.error.text.should.equal('There is already an account with this email');
        done();
    });
  });

  after(function(done) {
    if(id) {
      User.remove({username: 'test2'}, function(err) {
        if (err)
          throw err;
	done();
      })
    } else {
      done();
    }
  });
});
