"use strict";

var dbtools = require("../database/dbtools");
var events = require("events");

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
                // res.render("blog", {blog: result});
                if (result.blogCollectionId === "")
                {
                    res.render("blog", {blog: result, relativeBlogs: {}});
                }
                else
                {
                    dbtools.getBlogsByBlogCollectionId(result.blogCollectionId, function(err, results)
                    {
                        if (error)
                        {
                            next();
                        }
                        else
                        {
                            res.render("blog", {blog: result, relativeBlogs: results});
                        }
                    });   
                }   
            }
        });
    }
    
    return __checkBlogById;
}

module.exports = blogsMiddleware;