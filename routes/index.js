var express = require('express');
var router = express.Router();

/**
 * Basically we're requiring our Express functionality, 
 * then attaching a "router" variable to Express's router method, 
 * then using that method when an attempt is made to 
 * HTTP get the top level directory of our website. 
 * Finally we export our router function back to our app.
 */

/**
 * Use the express.Router class to create modular, mountable route handlers. 
 * A Router instance is a complete middleware and routing system
 */

/**
 * Middleware functions are functions that have access to the request object (req), 
 * the response object (res), and the next middleware function in the application’s request-response cycle. 
 * The next middleware function is commonly denoted by a variable named next.
 */

/* GET home page. */
router.get('/ohoho', function(req, res, next) 
{
    console.log(req.originalUrl + "1");
    next();
    
}, function(req, res, next)
{
    console.log(req.originalUrl + "2");
    res.end();
}
);

router.get("/", function(req, res, next)
{
    console.log(req.originalUrl + "3");
    res.end();
});


module.exports = router;
