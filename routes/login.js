var express = require('express');
var passport = require('passport');
var models = require('../models');
var router = express.Router();


router.post('/', passport.authenticate('local', { failureRedirect: 'about.html'}),
		function(req, res){
		console.log(req.user.id);

    res.cookie('UserState', req.user.id);
			res.redirect('/');
		});

router.get('/',
  function(req, res){
    res.render('tempLogin');
  });






module.exports = router;
