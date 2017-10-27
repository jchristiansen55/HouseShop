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
                    numBedrooms: {
                        [Op.like]: '%' + req.body.taskOption + '%'
                    }
                }
            ]
  		}
    })
    .then(function(listings) {
        res.render('filter', { // render the Search/Browse page
            title: 'Filtered Listings',
            listings: listings
        });
    });
});



module.exports = router;
