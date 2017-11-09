var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(app, models){

	app.use(passport.initialize());
	app.use(passport.session());

	// passport config
	passport.use(new LocalStrategy( {
    usernameField: 'email',
    passwordField: 'password',
    session: false
    }, function(email, password, done, err) {
        models.User.findOne({ where: {email: email, password: password}}).then(user => {
            if (err) { 
                return done(err); 
            }
            
            if (!user) { 
                return done(null, false); 
            }
      		return done(null, user);
    		});
  		}
		)); 
	passport.serializeUser(function(user, done) {
		console.log('serializing user: ');
    	console.log(user);
	 	done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
	  user.findById(id, function(err, user) {
	  	console.log('no im not serial');
	    done(err, user);
	  });
	});

	
};
