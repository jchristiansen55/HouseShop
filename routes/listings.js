var express = require('express');
var router = express.Router();

const fileUpload = require('express-fileupload');

router.use(fileUpload());

/* GET listings listing. */
router.get('/', function(req, res, next) {
  res.render('listings');
});

var models = require('../models');

/* POST new listing. */
router.post('/', function(req, res) {
    models.Listing.create({ address: req.body.Address, thumbnail: 'assets/' + req.files.imageFile.name, city: req.body.City,  state: req.body.State,  numBedrooms: req.body.numBedrooms}).then(function() {
	       var imageFile = req.files.imageFile;
	       imageFile.mv(__dirname + '/../public/assets/' + req.files.imageFile.name, function(err) {
    	          if (err){
      		              return res.status(500).send(err);
		          } else {
			              res.redirect('/');
		          }
	       });
    });
});

module.exports = router;
