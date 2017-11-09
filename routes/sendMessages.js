var express = require('express');
var router = express.Router();
var models = require('../models');
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "database_test"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to messages!");
});

const Op = models.sequelize.Op;

var userId = "Richard";

router.post('/', function(req, res, next) {
    var sql = "INSERT INTO messages4 (sender, receiver, content) VALUES ('" + userId +"', '" + req.body.usr +"', '"+ req.body.messages +"')";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
});

router.get('/', function(req, res, next) {
    res.render('sendMessages');
});

module.exports = router;
