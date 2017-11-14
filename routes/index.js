var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET home page. */


var User = require('../models/user');


var isAuthenticated = function(req,res,next){
	console.log('con log' + req.session.passport.user);
	if(req.user) {
		return next();
	} else {
		return res.status(401).json({
			error: 'User not authenticated'
		});
	}
};

router.get('/fa17g09', function(req, res, next) {
    //res.sendFile(path.join(__dirname + '/index.html'));
   
  console.log('Runn\n\n' + req.isAuthenticated());
  var cookiename = 'cookieName';
	console.log(req.cookies) ;

    models.Listing.findAll().then(function(listings) {
        res.render('index', {
            title: 'Home Page',
            listings: listings,
            layout: './layouts/home-layout' // Set custom layout for single render


        });
    });
});

module.exports = router;
