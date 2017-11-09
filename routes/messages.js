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
// replace kevin with unique id from nemi and henry
// router.post('/', function(req, res, next) {
//     var sql = "INSERT INTO messages2 (sender, content, conversation_id) VALUES ('Kevin', '"+ req.body.messages +"', 127)";
//     con.query(sql, function (err, result) {
//         if (err) throw err;
//         console.log("1 record inserted");
//     });
// });

// router.get('/', function(req, res, next) {
//     res.render('messages');
//     var sql = "SELECT sender, content FROM messages2 WHERE conversation_id='127'";
//     con.query(sql, function (err, result, fields) {
//         if (err) throw err;
//         console.log(result);
//       });
// });


// router.post('/', function(req, res, next) {
//     var sql = "INSERT INTO messages3 (sender, receiver, content) VALUES ('Kevin', 'Steve', '"+ req.body.messages +"')";
//     con.query(sql, function (err, result) {
//         if (err) throw err;
//         console.log("1 record inserted");
//     });
// });

// router.get('/', function(req, res, next) {
//     var sql = "SELECT sender, content, receiver FROM messages3 WHERE sender='Kevin' && receiver='Steve'";
//     con.query(sql, function (err, result, fields) {
//         if (err) throw err;
//         console.log(result);
//         res.render('messages', {
//             results: result
//         });
//       });
// });

router.post('/', function(req, res, next) {
    var sql = "INSERT INTO messages4 (sender, receiver, content) VALUES ('Kevin', 'Steve', '"+ req.body.messages +"')";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
});

router.get('/', function(req, res, next) {
    var sql = "SELECT sender, content, receiver FROM messages4 WHERE sender='Kevin' && receiver='Steve' OR (receiver='Kevin' && sender='Steve') ";
    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.render('messages', {
            results: result
        });
      });
});

module.exports = router;
