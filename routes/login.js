var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('../config/local-strategy').Strategy;
var models = require('../models');

router.use(passport.initialize());

router.post('/', passport.authenticate('local', { failureRedirect: 'search',
                                                  successRedirect: 'about' }));

router.get('/',
  function(req, res){
    res.render('tempLogin');
  });

module.exports = router;
