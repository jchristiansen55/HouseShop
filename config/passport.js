/*'use strict';

var passport = require('passport');  
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models');
var app = require('../app');
/*
passport.use(new LocalStrategy(LOCAL_STRATEGY_CONFIG, function(email, password, done) {
    models.User.findOne({ email: req.body.email }), 
    function (err, user) {
        if (err) { return done(err); }
        return done(null, user);
    }
}));


module.exports = function(app) {  
  passport.serializeUser(function(user, done) {
      console.log("in passport.js");
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, done);
  });
*/
  // load strategies
//  require('./local-strategy')(passport);
//};
