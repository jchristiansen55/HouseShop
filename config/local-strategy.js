var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var models = require('../models');
 
passport.use(new LocalStrategy( {
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    }, function(email, password, done) {
        console.log("email: " + email + " password: " + password);
    models.User.findAll({ where: {email: email, password: password}}).then(function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));   
