var express = require('express');
var router = express.Router();
var models = require('../models');

const Op = models.sequelize.Op;

/* POST search page
   '/' is NOT Home page
*/ 
router.post('/', function(req, res, next) {
    //res.sendFile(path.join(__dirname + '/index.html'));
    models.Listing.findAll({
  		where: {
            [Op.or]: [
                {
                    address: {
                        [Op.like]: '%' + req.body.city + '%'
                    }
                },
                {
    		        city: {
                        [Op.like]: '%' + req.body.city + '%'
                    }
                },
                {
                    state: {
                        [Op.like]: '%' + req.body.city + '%'
                    }
                },
                {
                    zipcode: {
                        [Op.like]: '%' + req.body.city + '%'
                    }
                }
            ]
  		}
	}).then(function(listings) {
        res.render('search', { // render the Search/Browse page
            title: 'Browse Listings',
            listings: listings
        });
    });
});

router.get('/', function(req, res, next) {
    //res.sendFile(path.join(__dirname + '/index.html'));
    models.Listing.findAll()
    .then(function(listings) {
        res.render('search', { // render the Search/Browse page
            title: 'Browse Listings',
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
