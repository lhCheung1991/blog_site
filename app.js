var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// require mongo modules
var mongo = require('mongodb');
var monk = require('monk');
var db = monk("127.0.0.1:27017/blog_site_db");

// Routes are kind of like a combination of models and controllers in this setup, 
// they direct traffic and also contain some programming logic
var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();    // instantiates Express

// configure a bunch of Express stuff

// view engine setup
app.set('views', path.join(__dirname, 'views'));    // location of jade files 
app.set('view engine', 'jade');

/**
 * establishing middleware for Express
 */
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));    // telling Express to serve static objects from the /public/ dir, 
                                                            // but to make them actually seem like they're coming from the top level
/************route section******************/
/**
 * This directives are telling Express 
 * what route files to use.
 */

app.use(function(req, res, next)
{
    req.db = db;
    next();
});

app.use('/', routes);
app.use('/users', users);
/************route section******************/


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// A core part of Node is that basically all modules export an object, which can easily be called elsewhere in the code. 
module.exports = app;
