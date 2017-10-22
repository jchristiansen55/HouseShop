var express = require('express');
var router = express.Router();
var models = require('../models');

const Op = models.sequelize.Op;

/* GET home page. */
router.post('/', function(req, res, next) {
    //res.sendFile(path.join(__dirname + '/index.html'));
    models.Listing.findAll({
  		where: {
    		city: {
                [Op.like]: '%' + req.body.city + '%',
            }
  		}
	}).then(function(listings) {
        res.render('search', {
            title: 'Listings',
            listings: listings
        });
    });
});

/*
router.post('/other', function(req, res, next) {
    //res.sendFile(path.join(__dirname + '/index.html'));
    models.Listing.findAll({
  		where: {
    		city: req.body.city
  		}
	}).then(function(listings) {
        res.render('search', {
            title: 'Listings',
            listings: listings
        });
    });
});
*/


module.exports = router;
