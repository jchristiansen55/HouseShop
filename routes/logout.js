var express = require('express');
var router = express.Router();
var fa17g09_env_prefix = require('../prefix');

router.post('/', function(req, res){

        res.cookies('User', '');
        res.cookie('UserState', '');
        res.cookie('UserType', '');
		res.redirect('/' + fa17g09_env_prefix);
		});

module.exports = router;
