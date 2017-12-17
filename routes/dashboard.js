var express = require('express');
var router = express.Router();
var models = require('../models');

const Op = models.sequelize.Op;

router.get('/', function(req, res, next) {

    var userId;

    if(req.cookies.UserState == undefined) {
        req.cookies.UserState = 0;
        userId = 0;
    } else {
        userId = req.cookies.UserState;
    }  

    models.Message.findAll({
        where: {
            receiver: userId
        }
    }).then(function(messages) {
        models.User.findAll({
            where: {
                id: messages.userId
            }
        }).then(function(users) {
            console.log(users)
        });
    });

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
