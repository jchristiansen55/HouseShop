var express = require('express');
var router = express.Router();
var models = require('../models');
var validator = require('validator');

const Op = models.sequelize.Op;

var prevReq;

router.get('/:listing?', function(req, res, next) {
    var listingid = req.query.listing;
    prevReq = listingid;
    
    models.Listing.findOne({where: {id: listingid}})
    .then(function(listing) {
        models.Media.findAll({where: {listingid: listingid}})
        .then(function(media) {
            models.User.findOne({where: {id: listing.UserId}})
            .then(function(user) {
                res.render('listing', { // render the Listing page
                    title: 'Listing - GET', // remove 'GET'
                    listing: listing,
                    media: media,
                    user: user, // listing agent
                    errors: []
                    UserState: req.cookies.UserState,
                    User: req.cookies.User
                });
            });
        });

    });

});

router.post('/', function(req, res, next) {

    var inputErrors = inputValidationErrors(req);
    
        if (inputErrors.length <= 0) {

            var listingid = prevReq;

            var userId;
            var receiverId;

            if(req.cookies.UserState == undefined) {
                req.cookies.UserState = 0;
                userId = 0;
            } else {
                userId = req.cookies.UserState;
            }  
              console.log(userId);

            models.Listing.findOne({where: {id: listingid}})
            .then(function(listing) {
                receiverId = listing.UserId;
                var message = {
                    sender: userId,
                    receiver: receiverId,
                    content: req.body.msg,
                };
                
                models.Message.create(message).then(function(newUser) {
                    console.log("ran");
                });
            });
            
            models.Listing.findOne({where: {id: listingid}})
            .then(function(listing) {
                models.Media.findAll({where: {listingid: listingid}})
                .then(function(media) {
                    models.User.findOne({where: {id: listing.UserId}})
                    .then(function(user) {
                        res.render('listing', { // render the Listing page
                            title: 'Listing - GET', // remove 'GET'
                            listing: listing,
                            media: media,
                            user: user, // listing agent
                            errors: []
                        });
                    });
                });
            });

        } else {

            redirectToView(res, inputErrors); 
        }
    
});

function redirectToView(res, inputErrors) {

    console.log(inputErrors);
    res.render('listing', {
        errors: inputErrors
    });
}

function inputValidationErrors(req) {
    var errors = [];

    if(!req.body.email || !validator.isEmail(req.body.email)) {
        errors.push("Please enter a valid email address.");
    }

    if(!req.body.name || !validator.isAlpha(req.body.name)) {
        errors.push("First or last name not entered or unsupported character(s) in first name or last name.");
    }

    if(!req.body.phone || !validator.isAscii(req.body.phone)) {
        errors.push("Phone number not entered or unsupported character(s) in phone number.");
    }

    var lengthError = " is too long, has to be under 40 characters";

    if(req.body.email.length > 40) {
        errors.push("Email" + lengthError);
    }

    if(req.body.name.length > 40) {
        errors.push("First name" + lengthError);
    }

    if(req.body.phone.length > 40) {
        errors.push("Phone number" + lengthError);
    }

    return errors;
}



module.exports = router;
