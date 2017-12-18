var express = require('express');
var passport = require('passport');
var models = require('../models');
var router = express.Router();
var fa17g09_env_prefix = require('../prefix');

router.post('/', passport.authenticate('local', {failureRedirect: '/login'}),

    function(req, res){
		console.log(req.user);

        res.cookie('User', req.user);
        res.cookie('UserState', req.user.id);
        if (req.user.userType == 'listingAgent') {
            res.redirect('dashboard');
        } else {
            res.redirect('/');
        }
	}
);

router.get('/' + fa17g09_env_prefix, function(req, res, next) {
    var userState = req.cookies.UserState;
    if (!userState) {
        res.cookie('UserState', '0');
        userState = 0;
    }

    res.render('login', {
        title: 'Login',
        User: req.cookies.User,
        UserState: userState,
        errors: req.cookies.errors,
        message: 'Please try to login again!'
    });

    res.cookie('errors', '');
});

module.exports = router;
