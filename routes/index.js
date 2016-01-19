var express = require('express');
var router = express.Router();
var dbtools = require("../database/dbtools");

router.get('/', function(req, res, next) 
{
    dbtools.getAllBlogs(function(error, result)
    {
        res.render("blog", {blog: result[result.length - 1]});
    });
    
    
});


module.exports = router;
