'use strict';

var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Thing = mongoose.model('Thing');

/**
 * Populate database with sample application data
 */

//Clear old things, then add things in
Thing.find({}).remove(function() {
  Thing.create({
    name : 'Agora Finance Services',
    info : 'Sencha dev & PHP as back-end',
    type : 'Work'
  },{
    name : 'Haubourdin',
    info : 'PHP / jQuery',
    type : 'Work'
  },{
    name : 'Intuitive travel',
    info : 'PHP / jQuery / Linux',
    type : 'Work'
  },{
    name : 'Ingésup',
    info : 'Master\'s level',
    type : 'School'
  },{
    name : 'McDonald',
    info : 'Student job',
    type : 'Work'
  },{
    name : 'Thai Boxing',
    info : 'Since 11 years old',
    type : 'Sport'
  },{
    name : 'Moutain bike',
    info : 'Extrem sensations',
    type : 'Sport'
  }, function() {
      console.log('finished populating things');
    }
  );
});

// Clear old users, then add a default user
User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test',
    role: 'user'
  },{
    provider: 'local',
    name: 'Test User',
    email: 'admin@test.com',
    password: 'admin',
    role: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});
