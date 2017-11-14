var express = require('express');
var router = express.Router();
var models = require('../models');

const Op = models.sequelize.Op;

router.get('/', function(req, res, next) {
    //res.sendFile(path.join(__dirname + '/index.html'));

    models.Listing.findAll()
    .then(function(listings) {
        res.render('listing', { // render the Listing page
            title: 'Listing - GET', // remove 'GET'
            listings: listings,
        });
    });
});

module.exports = router;
