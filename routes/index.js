var express = require('express');
var router = express.Router();
var models = require('/home/fa17g09/public_html/models');

/* GET home page. */
router.get('/', function(req, res, next) {
    //res.sendFile(path.join(__dirname + '/index.html'));

    models.Listing.findAll().then(function(listings) {
        res.render('index', {
            title: 'Home Page',
            listings: listings,
            layout: './layouts/home-layout' // Set custom layout for single render
        });
    });
});

module.exports = router;
