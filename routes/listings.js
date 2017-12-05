var express = require('express');
var router = express.Router();

const fileUpload = require('express-fileupload');

router.use(fileUpload());

/* GET listings page. */
router.get('/', function(req, res, next) {
    res.render('listings' , {
        title: 'Listings',
        errors: req.cookies.errors,
        UserState: req.cookies.UserState
    });

});

var models = require('../models');

/* POST new listing. */
router.post('/', function(req, res) {

    var listing = {
        UserId: req.cookies.UserState,
        address: req.body.Address,
        thumbnail: 'assets/' + req.files.imageFile.name,
        city: req.body.City,
        state: req.body.State,
        numBedrooms: req.body.numBedrooms,
        numBathrooms: req.body.numBathrooms,
        squareFeet: req.body.squareFeet,
        price: req.body.price,
        description: req.body.description
    };

    models.Listing.create(listing).then(function(listing) {
           var imageFile = req.files.imageFile;

           var media = models.Media.create({
                ListingId: listing.id,
                imageFilePath: 'assets/' + req.files.imageFile.name
           });

// =======
    // models.Listing.create({ address: req.body.Address, thumbnail: 'assets/' + req.files.imageFile.name, city: req.body.City,  state: req.body.State,  numBedrooms: req.body.numBedrooms}).then(function() {
           // var imageFile = req.files.imageFile;
// >>>>>>> horizontal_prototype_listing_page
           imageFile.mv(__dirname + '/../public/assets/' + req.files.imageFile.name, function(err) {
                  if (err){
                          return res.status(500).send(err);
                  }
           });


           var imageFile2 = req.files.imageFile2;

           var media2 = models.Media.create({
               ListingId: listing.id,
               imageFilePath: 'assets/' + req.files.imageFile2.name
           });

           imageFile2.mv(__dirname + '/../public/assets/' + req.files.imageFile2.name, function(err) {
                  if (err){
                              return res.status(500).send(err);
                  } else {
                          res.redirect('listings');
                  }
           });
    });
});

module.exports = router;
