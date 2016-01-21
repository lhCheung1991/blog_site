"use strict";

var dbtools = require("../database/dbtools");

var blogsMiddleware = {};

blogsMiddleware.checkBlog = function ()
{
    function __checkBlogById(req, res, next)
    {
        var blogId = req.query.blogId;    // /blogs/checkblog?blogId=xxxxxxx
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
    }
    
    return __checkBlogById;
}

module.exports = blogsMiddleware;