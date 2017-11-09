var express = require('express');
var passport = require('passport');
var models = require('../models');
var router = express.Router();


router.post('/', passport.authenticate('local', { failureRedirect: 'about.html',
                                                  successRedirect: 'fa17g09/' }));

router.get('/',
  function(req, res){
    res.render('tempLogin');
  });






module.exports = router;


