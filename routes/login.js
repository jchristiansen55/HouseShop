var express = require('express');
var passport = require('passport');
var models = require('../models');
var router = express.Router();
var fa17g09_env_prefix = require('../prefix');

router.post('/', passport.authenticate('local', { failureRedirect: 'about.html'}),

    function(req, res){
		console.log(req.user);

        res.cookie('User', req.user);
        res.cookie('UserState', req.user.id);
		res.redirect('/' + fa17g09_env_prefix);
		});

router.get('/',
  function(req, res){
    res.render('tempLogin');
  });

module.exports = router;
