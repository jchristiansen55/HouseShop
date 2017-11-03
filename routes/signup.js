var express = require('express');
var router = express.Router();

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

    models.User.create(user).then(function(user) {
            res.redirect('/signup');
    });
});

module.exports = router;
