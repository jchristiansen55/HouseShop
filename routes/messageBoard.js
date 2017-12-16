var express = require('express');
var router = express.Router();
var models = require('../models');
var mysql = require('mysql');

const Op = models.sequelize.Op;

router.get('/', function(req, res, next) {
    res.render('messageBoard', {
      title: "Your Inbox"
    });
});
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
    })
    .then(function(results) {
      res.render('messageBoard', {
        title: "Your Inbox",
        results: results,
        UserState: req.cookies.UserState,
      });
    });
});

module.exports = router;
