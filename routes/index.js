var express = require('express');
var router = express.Router();
var models = require('../models');
var fa17g09_env_prefix = require('../prefix');
var User = require('../models/user');

/* GET home page. */
router.get('/' + fa17g09_env_prefix, function(req, res, next) {
    var userState = req.cookies.UserState;
    if (userState == undefined) {
        console.log("If statement entered");
        res.cookie('UserState', '0');
        res.cookie('User', '');
    }
    console.log("UserState: " + req.cookies.UserState);
    console.log("User object: " + req.cookies.User);
    models.Listing.findAll().then(function(listings) {
        res.render('index', {
            title: 'Home Page',
            listings: listings,
            layout: './layouts/home-layout', // Set custom layout for single render
            User: req.cookies.User,
            UserState: req.cookies.UserState
        });
    });
});

module.exports = router;
