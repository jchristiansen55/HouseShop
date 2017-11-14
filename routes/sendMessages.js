var express = require('express');
var router = express.Router();
var models = require('../models');
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "fa17g09_development"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to messages!");
});

const Op = models.sequelize.Op;

router.post('/', function(req, res, next) {
    var userId;
    
    if(req.cookies.UserState == undefined) {
    req.cookies.UserState = 0;
    userId = 0;
    } else {
    userId = req.cookies.UserState;
    }  
      console.log(userId);
    //var sql = "INSERT INTO Messages (sender, receiver, content) VALUES ('" + userId +"', '" + req.body.usr +"', '"+ req.body.messages +"')";

    var message = {
        sender: userId,
        receiver: req.body.usr,
        content: req.body.messages,
    };
    models.Message.create(message).then(function(newUser) {
        console.log("ran");
    });
    

    // con.query(sql, function (err, result) {
    //     if (err) throw err;
    //     console.log("1 record inserted");
    // });
});

router.get('/', function(req, res, next) {
    res.render('sendMessages');
});

module.exports = router;
