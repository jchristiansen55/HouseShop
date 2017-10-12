var express = require('express');
var router = express.Router();

const fileUpload = require('express-fileupload');

router.use(fileUpload());

/* GET listings listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

var models = require('../models');

/* POST new listing. */
router.post('/', function(req, res) {
  models.Listing.create({ address: req.body.address, picture_filename: req.files.imageFile.name  }).then(function() {
	let imageFile = req.files.imageFile;
	imageFile.mv(__dirname + '/../public/images/listings/' + req.files.imageFile.name, function(err) {
    		if (err){
      			return res.status(500).send(err);
		} else {
			res.redirect('/');
		}
	});
  });
});

module.exports = router;
