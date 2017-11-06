var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('../config/local-strategy').Strategy;
var models = require('../models');

router.post('/', passport.authenticate('local', { failureRedirect: 'search'}), function(req, res) {
    res.redirect('about');
});

router.get('/',
  function(req, res){
    res.render('tempLogin');
  });


module.exports = router;
