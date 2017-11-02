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
var listings = require('./routes/listings');
var filter = require('./routes/filter');
var login = require('./routes/login');
var models = require('./models');
var app = express();



// create sequelize object
var Sequelize = require('sequelize');

// set up sequelize config
// var sequelize = new Sequelize('csc648_m2_development', 'root', '', {
var sequelize = new Sequelize('fa17g09', 'fa17g09', 'csc648fa17g09', {
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
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/search', search);
app.use('/listings', listings);
app.use('/filter', filter);
app.use('/login', login);
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

var va17g09_env_prefix;
if (app.get('env') == 'production') {
    fa17g09_env_prefix = 'fa17g09';
} else {
    fa17g09_env_prefix = '';
}

app.locals.fa17g09_env_prefix = fa17g09_env_prefix;
console.log('Running using ' + app.get('env') + ' profile.');

var fa17g09_env_prefix;
if (app.get('env') == 'production') {
    fa17g09_env_prefix = 'fa17g09';
} else {
    fa17g09_env_prefix = '';
}

app.locals.fa17g09_env_prefix = fa17g09_env_prefix;
console.log('Running using ' + app.get('env') + ' profile.');


module.exports = app;
