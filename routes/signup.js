var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

/* GET signup page. */
router.get('/', function(req, res, next) {
  res.render('signup');
});

var models = require('../models');

/* POST new user. */
router.post('/', function(req, res) {
    var user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        email: req.body.email
    };
    // signup
    passport.use(
         'local-signup',
         new LocalStrategy({
             usernameField : 'username',
             passwordField : 'password',
         }, function(req, username, password, done) {
            // if there is no user with that username
            // create the user
            var newUser = {
                username: username,
                password: password
            };

            return done(null, newUserMysql);
        }
         ));
    models.User.create(user).then(function(newUser) {
        res.redirect('/signup');
    });

});

module.exports = router;
