var express = require('express');
var router = express.Router();
var models = require('../models');

const Op = models.sequelize.Op;

router.get('/', function(req, res, next) {
    var userId;
    var totalUsers = [];

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
        for(var i = 0; i < messages.length; i++ ){
            console.log("Id ", messages[i].sender);
            models.User.findOne({
                where: {
                    id: messages[i].sender
                }
            }).then(function(user) {
                totalUsers.push(user);
            })
        }
    }).then(function(test){
        models.Listing.findAll().then(function(listings) {
            res.render('dashboard', {
                title: 'Welcome to Your Dashboard',
                listings: listings,
                totalUsers: totalUsers,
                UserState: req.cookies.UserState,
                User: req.cookies.User
            });
        });
    });
});

module.exports = router;
