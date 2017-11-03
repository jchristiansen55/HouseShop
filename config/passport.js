'use strict';

var passport = require('passport');  
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models');
var app = require('../app');

module.exports.init = function(app) {  
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, done);
  });

  // load strategies
  require('./strategies/local')(passport);
};
