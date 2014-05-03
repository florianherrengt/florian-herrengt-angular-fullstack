'use strict';

var should = require('should'),
    app = require('../../../server'),
    request = require('supertest'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    passportStub = require('passport-stub'),
    agent = request.agent(app),
    path = require('path'),
    user;
app.set('views', path.normalize(__dirname + '/../../../app/views'));
passportStub.install(app);
var req = request(app);


describe('GET /api/awesomeThings', function() {
  before(function(done) {
      user = new User({
        email    : "user@user.com",
        firstName: "Full Name",
        lastName : "Last Name",
        password : "pass11",
        role : 'user'
      });
      user.save(done);
  });

  it('should respond with 401 if user not authenticated', function(done) {
    req
      .get('/api/awesomeThings')
      .expect(401)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('should respond with awesomeThings content if user authenticated', function(done) {
    passportStub.login({username: 'john.doe'});
    req
      .get('/api/awesomeThings')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.result.should.be.instanceof(Array);
        done();
      });
  });

  it('should respond with 401 if user is not admin', function(done) {
    passportStub.login({username: 'john.doe'});
    req
      .get('/partials/settings')
      .expect(401)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('should respond with 200 content if user is admin', function(done) {
    passportStub.login({username: 'john.doe', role : 'admin'});
    req
      .get('/partials/settings')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        // res.body.result.should.be.instanceof(Array);
        done();
      });
  });
});
