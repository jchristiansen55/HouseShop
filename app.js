var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var search = require('./routes/search');
var models = require('./models');
var app = express();



// create sequelize object
var Sequelize = require('sequelize');

// set up sequelize config
// var sequelize = new Sequelize('csc648_m2_development', 'root', '', {
var sequelize = new Sequelize('database_development', 'root', '', {
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

/*
var firstListing = models.Listing.build({
    listingID: 2,
    price: 12,
    state: 'CA',
    city: 'Vancouver',
    zipcode: 95864,
    address: '12a 0xs93ksj',
    numBedrooms: 8,
    numBathrooms: 900,
    square_feet: 102938,
    description: 'is that a real place?',
    thumbnail: 'assets/img2.jpg'
});

firstListing.save().then(function(err) {
 if (err) {
    console.log('Error in Inserting Record');
 } else {
    console.log('Data successfully inserted');
 }
});

var secondListing = models.Listing.build({
    listingID: 3,
    price: 12,
    state: 'CA',
    city: 'San Jose',
    zipcode: 94015,
    address: '12a 0xs93ksj',
    numBedrooms: 8,
    numBathrooms: 900,
    square_feet: 102938,
    description: 'home sweet home',
    thumbnail: 'assets/img3.jpg'
});

secondListing.save().then(function(err) {
 if (err) {
    console.log('Error in Inserting Record');
 } else {
    console.log('Data successfully inserted');
 }
});

var thirdListing = models.Listing.build({
    listingID: 4,
    price: 12,
    state: 'CA',
    city: 'San Lorenzo',
    zipcode: 94015,
    address: '12a 0xs93ksj',
    numBedrooms: 8,
    numBathrooms: 900,
    square_feet: 102938,
    description: 'my oh my',
    thumbnail: 'assets/img4.jpg'
});

thirdListing.save().then(function(err) {
 if (err) {
    console.log('Error in Inserting Record');
 } else {
    console.log('Data successfully inserted');
 }
});

var fourthListing = models.Listing.build({
    listingID: 6,
    price: 120,
    state: 'NY',
    city: 'Albany',
    zipcode: 94107,
    address: '12 Holloway Avenue',
    numBedrooms: 1000000,
    numBathrooms: 900,
    square_feet: 102,
    description: 'impossebreu',
    thumbnail: 'assets/img2.jpg'
});

fourthListing.save().then(function(err) {
 if (err) {
    console.log('Error in Inserting Record');
 } else {
    console.log('Data successfully inserted');
 }
});

/* To delete an entry */
/*
models.Listing.destroy({
    where: {state: 'NY'}
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
app.use(express.static('public'));


app.use('/', index);
app.use('/users', users);
app.use('/search', search);

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

var fa17g09_env_prefix;
if (app.get('env') == 'production') {
    fa17g09_env_prefix = 'fa17g09';
} else {
    fa17g09_env_prefix = '';
}

app.locals.fa17g09_env_prefix = fa17g09_env_prefix;
console.log('Running using ' + app.get('env') + ' profile.');


module.exports = app;
