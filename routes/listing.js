var express = require('express');
var router = express.Router();
var models = require('../models');

const Op = models.sequelize.Op;

router.get('/:listing?', function(req, res, next) {
    //res.sendFile(path.join(__dirname + '/index.html'));
    var listingid = req.query.listing;
    console.log(listingid);

    models.Listing.findOne({where: {id: listingid}})
    .then(function(listing) {
        models.Media.findAll({where: {listingid: listingid}})
        .then(function(media) {
            res.render('listing', { // render the Listing page
                title: 'Listing - GET', // remove 'GET'
                listing: listing,
                media: media
            });    
        });  
        
    });

});

module.exports = router;
