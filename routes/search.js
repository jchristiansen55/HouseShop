var express = require('express');
var router = express.Router();
var models = require('../models');
var expressValidator = require('express-validator');

const Op = models.sequelize.Op;

router.use(expressValidator());

/* POST search page
   '/' is NOT Home page
*/ 
router.post('/', function(req, res, next) {

    if (req.body.city < 0) {
        req.checkBody('city', 'Error: You entered a negative number').isInt({min: 0});
    }
    req.checkBody('city', 'Search string too long').isLength({max: 40})
        .notEmpty(req.body.city).withMessage('Search field empty. Please enter an address, zip code, city, or state')
    req.sanitize('city')
        .blacklist('!@#$%^*;+');

    var errors = req.validationErrors();
    console.log("Errors object: " + errors);
    if (errors) {
        res.cookie('errors', errors[0]);
        res.redirect('back');
        res.send(errors);
    }
    else {
        var queryBuilderArguments = {searchString : req.body.city};
        if(req.body.sortOption) {
            queryBuilderArguments.orderMode = req.body.sortOption;
        }

        models.Listing.findAll(buildListingsQuery(queryBuilderArguments)).then(function(listings) {
            res.render('search', { // render the Search/Browse page
                title: 'Search',
                listings: listings,
                previousSearchString: req.body.city,
                previousSortOption: req.body.sortOption,
                UserState: req.cookies.UserState,
                User: req.cookies.User,
                errors: req.cookies.errors
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
    }
});

router.get('/', function(req, res, next) {
    //res.sendFile(path.join(__dirname + '/index.html'));
    models.Listing.findAll()
    .then(function(listings) {
        res.render('search', { // render the Search/Browse page
            title: 'Search',
            listings: listings,
            previousSearchString: req.body.city,
            previousSortOption: req.body.sortOption,
            UserState: req.cookies.UserState,
            User: req.body.User,
            errors: req.cookies.errors
        });
    });
    res.cookie('errors', '');
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
