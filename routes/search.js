var express = require('express');
var router = express.Router();
var models = require('../models');

const Op = models.sequelize.Op;

/* POST search page
   '/' is NOT Home page
*/ 
router.post('/', function(req, res, next) {
    var queryBuilderArguments = {searchString : req.body.city};
    if(req.body.sortOption) {
        queryBuilderArguments.orderMode = req.body.sortOption;
    }

    models.Listing.findAll(buildListingsQuery(queryBuilderArguments)).then(function(listings) {
        res.render('search', { // render the Search/Browse page
            title: 'Search',
            listings: listings,
            previousSearchString: req.body.city,
            previousSortOption: req.body.sortOption
        });

        // START HOW TO GET AND USE ASSOCIATED MODELS
        console.log(models.Listing.prototype);

        listings.forEach(function(listing) {
            console.log("listing.address: " + listing.address);
            listing.getMedia().then(function(media){
                media.forEach(function(medium) {
                    console.log("medium.id: " + medium.id + ", medium.imageFilePath: " + medium.imageFilePath);
                });
            });
        });
        // END HOW TO GET AND USE ASSOCIATED MODELS

    });
});

router.get('/', function(req, res, next) {
    //res.sendFile(path.join(__dirname + '/index.html'));
    models.Listing.findAll()
    .then(function(listings) {
        res.render('search', { // render the Search/Browse page
            title: 'Search',
            listings: listings
        });
    });
});

module.exports = router;

function buildListingsQuery(queryBuilderArguments) {
    var sequelizeQuery = {
        include: [ models.Media ] // !! This line requests retrieval of the associated model.
	};

    if (queryBuilderArguments.searchString){
        sequelizeQuery.where = {
            [Op.or]: [
                {
                    address: {
                        [Op.like]: '%' + queryBuilderArguments.searchString + '%'
                    }
                },
                {
    		        city: {
                        [Op.like]: '%' + queryBuilderArguments.searchString + '%'
                    }
                },
                {
                    state: {
                        [Op.like]: '%' + queryBuilderArguments.searchString + '%'
                    }
                },
                {
                    zipcode: {
                        [Op.like]: '%' + queryBuilderArguments.searchString + '%'
                    }
                }
            ]
  		};
    }

    if (queryBuilderArguments.orderMode){
        sequelizeQuery.order = models.sequelize.literal(queryBuilderArguments.orderMode);
    }

    return sequelizeQuery;
}
