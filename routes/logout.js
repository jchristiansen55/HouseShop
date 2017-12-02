var express = require('express');
var router = express.Router();
var fa17g09_env_prefix = require('../prefix');

router.post('/', function(req, res){
/*
        if (statusCode >= 100 && statusCode < 600) {
            rest.status(statusCode);
        } else
            rest.status(500);
*/
        res.cookie('User', '');
        res.cookie('UserState', '0');
		res.redirect('/' + fa17g09_env_prefix);
});

module.exports = router;
