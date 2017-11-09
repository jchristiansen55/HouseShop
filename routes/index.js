var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET home page. */


router.get('/fa17g09', function(req, res, next) {
    //res.sendFile(path.join(__dirname + '/index.html'));
    res.locals.login = req.isAuthenticated();
  console.log('Runn\n\n' + req.user );


    models.Listing.findAll().then(function(listings) {
        res.render('index', {
            title: 'Home Page',
            listings: listings,
            layout: './layouts/home-layout' // Set custom layout for single render


        });
    });
});

module.exports = router;
