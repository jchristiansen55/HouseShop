var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var models = require('../modles');
var sequelize = require('sequelize');

const Op = models.sequelize.Op;


passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false
  },
  function(username, password, done) {
    models.User.findAll {
        where: {
            [Op.and]: [
                {
                    email: req.body.email
                },
                {
                    password: req.body.password
                }
            ]
        }
    }
    
    return done(null);
  }
));
