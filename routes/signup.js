var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var models = require('../models');
var crypto = require('crypto');
var key = process.env.key.toString();
var validator = require('validator');

/* GET signup page. */
router.get('/', function(req, res, next) {
  redirectToView(res, []); // no errors
});

/* POST new user. */
router.post('/', function(req, res) {

    var inputErrors = inputValidationErrors(req);

    if (inputErrors.length > 0) {
        redirectToView(res, inputErrors);
        return;
    }

    var type;

    if (req.body.listingAgent) {
        type = "listingAgent";
    } else {
        type = "client";
    }

    var cipher = crypto.createCipher('aes-256-ctr', key).update(req.body.password, 'utf-8', 'hex');
    var user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userType: type,
        password: cipher,
        email: req.body.email
    };

    models.User.create(user).then(function(newUser) {
        redirectToView(res, []); // no errors
    });

});

module.exports = router;

function redirectToView(res, inputErrors) {
    res.render('signup', {
        errors: inputErrors
    });
}

function inputValidationErrors(req) {
    var errors = [];

    if(!req.body.email || !validator.isEmail(req.body.email)) {
        errors.push("Please enter a valid email address.");
    }

    if(!req.body.firstName || !req.body.lastName || !validator.isAlpha(req.body.firstName) || !validator.isAlpha(req.body.lastName)) {
        errors.push("First or last name not entered or unsupported character(s) in first name or last name.");
    }

    if(!req.body.Phone || !validator.isAscii(req.body.Phone)) {
        errors.push("Phone number not entered or unsupported character(s) in phone number.");
    }

    if(!req.body.password || !req.body.confirmPassword || !validator.isAscii(req.body.password) || !validator.isAscii(req.body.confirmPassword)) {
        errors.push("Passwords not entered or unsupported character(s) in password.");
    }

    if(req.body.password != req.body.confirmPassword) {
        errors.push("Passwords do not match");
    }
    // at this point we've verified that values are present and just want to verify field length:

    var lengthError = " is too long, has to be under 40 characters";

    if(req.body.email.length > 40) {
        errors.push("Email" + lengthError);
    }

    if(req.body.firstName.length > 40) {
        errors.push("First name" + lengthError);
    }

    if(req.body.lastName.length > 40) {
        errors.push("Last name" + lengthError);
    }

    if(req.body.Phone.length > 40 || req.body.Phone.length < 9) {
        errors.push("Please enter a valid phone number");
    }

    if(req.body.password.length > 40) {
        errors.push("Password" + lengthError);
    }

    return errors;
}
