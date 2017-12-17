var express = require('express');
var router = express.Router();
var models = require('../models');
var mysql = require('mysql');

const Op = models.sequelize.Op;

router.get('/', function(req, res, next) {
    var userId = req.cookies.UserState;
    var user = req.cookies.User;

    models.Message.findAll({
        where: {
            receiver: userId
        } 
    })
    .then(function(messages) {
        res.render('messageBoard', {
            title: "Your Inbox",
            messages: messages,
            UserState: req.cookies.UserState,
            User: req.cookies.User,
        });
    });
});

module.exports = router;
