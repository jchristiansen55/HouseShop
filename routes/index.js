var express = require('express');
var router = express.Router();

var models = require('../models');

router.get('/', function(req, res, next) {
  models.Listing.findAll().then(function(listings) {
    res.render('index', {
      title: 'HouseShop',
      listings: listings
    });
  });
});

module.exports = router;
