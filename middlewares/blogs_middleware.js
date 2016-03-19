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
                dbtools.getAllCommentsByBlogId(blogId, function (error, comments)
                {
                    if (error)
                    {
                        next();
                    }
                    else
                    {
                        if (result.blogCollectionId === "")
                        {
                            res.render("blog", {blog: result, comments: comments, relativeBlogs: {}});
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
                                    res.render("blog", {blog: result, comments: comments, relativeBlogs: results});
                                }
                            });   
                        }
                    }
                });   
            }
        });
    }
    
    return __checkBlogById;
}

blogsMiddleware.commitComment = function ()
{
    function __commitComment(req, res, next)
    {
        dbtools.saveNewComment(req.body, function (error)
        {
            if (error)
            {
                next();
            }
            else
            {
                res.redirect('/blogs/checkblog?blogId=' + req.body.blogId + '#defaultCommentEditor');
            }
        });
    }
    
    return __commitComment;
}

module.exports = blogsMiddleware;