var express = require('express');
var router = express.Router();
var models = require('../models');
var fa17g09_env_prefix = require('../prefix');
var User = require('../models/user');

/* GET home page. */
router.get('/' + fa17g09_env_prefix, function(req, res, next) {

  var cookiename = 'cookieName';
	console.log(req.cookies) ;

   


    models.Listing.findAll().then(function(listings) {
        res.render('index', {
            title: 'Home Page',
            listings: listings,
            layout: './layouts/home-layout', // Set custom layout for single render
            userType: req.cookies.UserType,
            errors: req.cookies.errors

        });
    });
    res.cookie('errors', '');
});

module.exports = router;
