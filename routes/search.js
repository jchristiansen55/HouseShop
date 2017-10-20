var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
    //res.sendFile(path.join(__dirname + '/index.html'));
    models.Listing.findAll({
  		where: {
    		state: 'CA'
  		}
	}).then(function(listings) {
        res.render('search', {
            title: 'Listings',
            listings: listings
        });
    });
});

module.exports = router;