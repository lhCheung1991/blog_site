var express = require('express');
var router = express.Router();

/**
 * the users route file might contain routes for 
 * adding users, deleting them, updating them.
 */

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
