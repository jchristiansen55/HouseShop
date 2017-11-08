var express = require('express');
var router = express.Router();
var models = require('../models');
var mysql = require('mysql');

const Op = models.sequelize.Op;

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

router.post('/', function(req, res, next) {
    var sql = "INSERT INTO messages2 (sender, content, conversation_id) VALUES ('Steve', '"+ req.body.messages2 +"', 127)";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
});

router.get('/', function(req, res, next) {
    res.render('messages2');
    var sql = "SELECT sender, content FROM messages2 WHERE conversation_id='127'";
    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
      });
});

module.exports = router;
