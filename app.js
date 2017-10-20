var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var models = require('./models');
var app = express();



// create sequelize object
var Sequelize = require('sequelize');

// set up sequelize config
var sequelize = new Sequelize('csc648_m2_development', 'root', '', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

//Checking connection status
var test = sequelize.authenticate()
    .then(function () {
        console.log("CONNECTED!");
    })
    .catch(function (err) {
        console.log("LORD HELP ME I CAN'T REACH THE DATABASE!");
    })
    .done();

// insert some dang ol' data
// TODO: Inserts data every time. Insert
//       data only once.

var firstListing = models.Listing.build({
    listingID: 3,
    price: 17,
    state: 'NY',
    city: 'NYC',
    zipcode: 88888,
    address: '12 Twelve Road',
    numBedrooms: 1,
    numBathrooms: 0,
    square_feet: 2,
    description: 'w0w new york 8:]'
});

firstListing.save().then(function(err) {
 if (err) {
    console.log('Error in Inserting Record');
 } else {
    console.log('Data successfully inserted');
 }
});


/* To delete an entry */
/*
models.Listing.destroy({
    where: {state: 'CA'}
});
*/
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(expressLayouts);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.set('port', 17009);
app.listen(app.get('port'));

module.exports = app;
