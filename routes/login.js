var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

router.get('/',
  function(req, res){
    res.render('tempLogin');
  });

passport.use(new LocalStrategy(
  function(email, password, done) {
    User.findOne({ username: email }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));

router.post('/', passport.authenticate('local', { failureRedirect: 'index' }),function(req, res) {
    res.redirect('login');
});

module.exports = router;
