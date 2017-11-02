var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET login page. */
router.get('/', function(req, res, next) {

    models.Listing.findAll().then(function(listings) {
        res.render('tempLogin', {
            title: 'Login',
            listings: listings,
            layout: './layouts/home-layout' // Set custom layout for single render
        });
    });
});

module.exports = router;
