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
router.get('/', function(req, res, next) {
    res.render('index', { title: 'GOGOGO' });
});

module.exports = router;
