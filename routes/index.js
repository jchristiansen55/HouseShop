var express = require('express');
var router = express.Router();
var models = require('../models');
var fa17g09_env_prefix = require('../prefix');
var User = require('../models/user');

/* GET home page. */
router.get('/' + fa17g09_env_prefix, function(req, res, next) {

    console.log("Cookies: v");
    console.log(req.cookies);
    var userState = req.cookies.UserState;
    if (userState === undefined) {
        res.cookie('UserState', '0'); // UserState of 0 for guest users
    }

    models.Listing.findAll().then(function(listings) {
        res.render('index', {
            title: 'Home Page',
            listings: listings,
            layout: './layouts/home-layout', // Set custom layout for single render
            User: req.cookies.User,
            UserState: req.cookies.UserState,
            errors: req.body.errors
        });
    });
    res.cookie('errors', '');
});

module.exports = router;
