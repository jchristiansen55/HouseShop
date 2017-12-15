var express = require('express');
var router = express.Router();
var models = require('../models');

const Op = models.sequelize.Op;

/* POST to current page
   '/' is NOT Home page
*/
// TODO: redirect to /search, not /filter
router.post('/', function(req, res, next) {
    models.Listing.findAll({
        where: {
            [Op.and]: [
                {
                    numBedrooms: {
                        [Op.gte]: req.body.bedFilterOption
                    }
                },
                {
                    numBathrooms: {
                        [Op.gte]: req.body.bathFilterOption
                    }
                }
            ]
  		}
    })
    .then(function(listings) {
        res.render('search', { // render the Search/Browse page
            title: 'Search',
            listings: listings,
            UserState: req.cookies.UserState,
            errors: req.cookies.errors
        });
    });
});



module.exports = router;
