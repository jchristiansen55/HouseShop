var express = require('express');
var router = express.Router();
var models = require('../models');

const Op = models.sequelize.Op;

/* POST to current page
   '/' is NOT Home page
*/
// TODO: redirect to /search, not /filter
router.post('/', function(req, res, next) {
    //res.sendFile(path.join(__dirname + '/index.html'));
    models.Listing.findAll({
        where: {
            [Op.or]: [
                {
                    numBedrooms: {
                        [Op.gte]: req.body.taskOption
                        // [Op.gte]: '%' + req.body.taskOption + '%'
                    }
                }
            ]
  		}
    })
    .then(function(listings) {
        res.render('search', { // render the Search/Browse page
            title: 'Filtered Listings',
            listings: listings
        });
    });
});



module.exports = router;
