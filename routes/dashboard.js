var express = require('express');
var router = express.Router();
var models = require('../models');

const Op = models.sequelize.Op;

router.get('/', function(req, res, next) {
    models.Listing.findAll().then(function(listings) {
        res.render('dashboard', {
            title: 'Welcome to Your Dashboard',
            listings: listings,
            UserState: req.cookies.UserState,
            User: req.cookies.User
        });
    });
});

module.exports = router;
