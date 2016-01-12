var express = require('express');
var router = express.Router();

/**
 * Basically we're requiring our Express functionality, 
 * then attaching a "router" variable to Express's router method, 
 * then using that method when an attempt is made to 
 * HTTP get the top level directory of our website. 
 * Finally we export our router function back to our app.
 */

/* GET home page. */
router.get('/', function(req, res, next) 
{
    /**
     * A route method is derived from one of the HTTP methods, 
     * and is attached to an instance of the express class.
     */
    res.render("index", {});
});

/**
 * used for loading middleware functions at a path for all request methods
 */
router.all("/", function(req, res, next)
{
    next(); // pass control to the next handler
});

module.exports = router;
