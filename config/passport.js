'use strict';

var passport = require('passport');  
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models');
var app = require('../app');
var LOCAL_STRATEGY_CONFIG = {
  usernameField: 'email',
  passwordField: 'password',
  session: false
};

passport.use(new LocalStrategy(LOCAL_STRATEGY_CONFIG, function(email, password, done) {
    models.User.findOne({ email: req.body.email }), 
    function (err, user) {
        if (err) { return done(err); }
        return done(null, user);
    }
}));


module.exports.init = function(app) {  
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, done);
  });

  // load strategies
  require('./local-strategy')(passport);
};
