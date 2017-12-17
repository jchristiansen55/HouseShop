var express = require('express');
var router = express.Router();
var models = require('../models');
var fa17g09_env_prefix = require('../prefix');
var User = require('../models/user');

router.get('/' + fa17g09_env_prefix, function(req, res, next) {
    var userState = req.cookies.UserState;
    if (!userState) {
        res.cookie('UserState', '0');
        userState = 0;
    }

    // Render About Page and get User info
    res.render('about', {
        title: 'About Page',
        User: req.cookies.User,
        UserState: userState,
        // userType: req.user.userType,
        errors: req.cookies.errors
    });

    res.cookie('errors', '');
});

module.exports = router;
