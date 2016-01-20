"use strict";

var dbtools = require("../database/dbtools");

var blogs = function (req, res, next)
{
    var blogId = req.query.blogId;
    dbtools.getBlogById(blogId, function (error, result)
    {
        if (error)
        {
            next();
        }
        else
        {
            res.render("blog", {blog: result});    
        }
    });
};

module.exports = blogs;