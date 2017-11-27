var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var models = require('../models');
var crypto = require('crypto');
var key = process.env.key;

/* GET signup page. */
router.get('/', function(req, res, next) {
  res.render('signup');
});

/* POST new user. */
router.post('/', function(req, res) {

    var cipher = crypto.createCipher('aes-256-ctr', key).update(req.body.password, 'utf-8', 'hex');
    var user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userType: req.body.userType
        password: cipher,
        email: req.body.email
    };

    models.User.create(user).then(function(newUser) {
        res.redirect('/signup');
    });

});

module.exports = router;
