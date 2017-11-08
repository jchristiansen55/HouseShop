var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('../config/local-strategy').Strategy;
var models = require('../models');

router.use(passport.initialize());

router.post('/', passport.authenticate('local', { failureRedirect: 'about.html',
                                                  successRedirect: 'fa17g09/' }));

router.get('/',
  function(req, res){
    res.render('tempLogin');
  });

module.exports = router;
