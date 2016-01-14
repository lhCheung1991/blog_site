var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Routes are kind of like a combination of models and controllers in this setup, 
// they direct traffic and also contain some programming logic
var routes = require('./routes/index');
var users = require('./routes/users');
var adminRouter = require("./routes/admin");

var app = express();    // instantiates Express

/**
 * Before Express can render template files, the following application settings must be set:
 *    -views, the directory where the template files are located
 *    -view engine, the template engine to use. Eg: app.set('view engine', 'jade')
 *    -jade, export a function named __express(filePath, options, callback), 
 *     which is called by the res.render() function to render the template code
 */
app.set('views', path.join(__dirname, 'views'));    // location of template files
app.set('view engine', 'jade');    // don't need to specify the file extension .jade
app.set("json spaces", 40);

/**
 * Application-level middleware
 *     -Bind application-level middleware to an instance of the app object 
 *      by using the app.use() and app.METHOD() functions,
 * Router-level middleware
 *     -it is bound to an instance of express.Router()
 *     -Load router-level middleware by using the router.use() and router.METHOD() functions.
 * Error-handling middleware
 *     -provide four arguments to identify it as an error-handling middleware function
 * Build-in middleware
 *     -The only built-in middleware function in Express is express.static. 
 *      This function is based on serve-static, and is responsible for serving the 
 *      static assets of an Express application.
 * Third-party middleware
 */

/**
 * establishing middleware for Express
 * To load the middleware function, call app.use(), 
 * specifying the middleware function.
 * middleware functions that are loaded first are also executed first
 */
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));    // telling Express to serve static objects from the /public/ dir, 
                                                            // but to make them actually seem like they're coming from the top level                                                           // The root argument specifies the root directory from which to serve static assets
app.use("/admin", express.static(path.join(__dirname, 'public')));
/************route section******************/
/**
 * This directives are telling Express 
 * what route files to use.
 */

app.use('/', routes);
app.use('/users', users);
app.use("/admin", adminRouter);
/************route section******************/

/**
 * If you pass anything to the next() function (except the string 'route'), 
 * Express regards the current request as being in error and 
 * will skip any remaining non-error handling routing and middleware functions.
 * next(err) will skip all remaining handlers in the chain 
 * except for those that are set up to handle errors as described above
 */
/*********error middleware section***********/
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');    // Node 's global.Error
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
app.use(function(err, req, res, next){
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
/*********error middleware section***********/
 
module.exports = app;
