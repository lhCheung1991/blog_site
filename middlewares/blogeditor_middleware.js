"use strict";

var dbtools = require("../database/dbtools");
var blogEditorMiddleware = {};

blogEditorMiddleware.checkoutBlogById = function ()
{
    function __checkoutBlogById(req, res, next)
    {
        dbtools.getBlogById(req.query.blogId, function(error, result)
        {
            if (error)
            {
                next();
            }
            else
            {
                res.render("blogeditor", {blogId: result._id});
            } 
        });
    }
    
    return __checkoutBlogById;
}

blogEditorMiddleware.pulloutBlogById = function ()
{
    function __pulloutBlogById(req, res, next)
    {
        dbtools.getBlogById(req.query.blogId, function (error, result)
        {   
            if (error)
            {
                next();
            }
            else
            {
                res.setHeader("Content-Type", "application/json");
                res.json(result);   
            }
        });
    }
    
    return __pulloutBlogById;
}

blogEditorMiddleware.pushUpdatedBlogById = function ()
{
    function pushUpdatedBlogById(req, res, next)
    {
        var blogId = req.body.blogId;
        var updatedBlog = req.body.updatedBlog;
        dbtools.updateBlogById(blogId, updatedBlog, function(error, result)
        {
            if (error)
            {
                res.status(500).end();
            }
            else
            {
                res.status(200).end();
            }
        });
    }
    
    return pushUpdatedBlogById;
}

blogEditorMiddleware.checkoutPlainEditor = function ()
{
    function __checkoutPlainEditor(req, res, next)
    {
        res.render("blogeditor", {blogId: "######"});
    }   
    return __checkoutPlainEditor;
}

blogEditorMiddleware.pushNewBlog = function ()
{
    function __pushNewBlog(req, res, next)
    {
        dbtools.saveNewBlog(req.body, function (error)
        {
            if (error)
            {
                res.status(500).end();
            }
            else
            {
                res.status(200).end();
            }
        });
    }
    return __pushNewBlog;
}

/**********************blog collection manipulation******************/
blogEditorMiddleware.saveNewBlogCollection = function()
{
    function __saveNewBlogCollection(req, res, next)
    {
        dbtools.saveNewBlogCollection(req.body, function (error)
        {
            if (error)
            {
                next();
            }
            else
            {
                res.status(200).end();
            }
        });
    }
    
    return __saveNewBlogCollection;
}

blogEditorMiddleware.checkoutAllBlogCollections = function()
{
    function __checkoutAllBlogCollections(req, res, next)
    {
        dbtools.getAllBlogCollections(function (error, result)
        {
            if (error)
            {
                next();
            }
            else
            {
                res.setHeader("Content-Type", "application/json");
                res.json(result);
            }
        });
    }
    
    return __checkoutAllBlogCollections;
}

blogEditorMiddleware.removeCollectionById = function ()
{
    /**
     * reset the blogCollectionId of the blogs, then remove collection by id
     */
    function __removeCollectionById(req, res, next)
    {
        dbtools.getBlogsByBlogCollectionId(req.body._id, function(error, blogs)
        {
            for (let idx = 0; idx < blogs.length; idx++)
            {
                blogs[idx].blogCollectionId = "";
                dbtools.updateBlogById(blogs[idx]._id, blogs[idx], function(error, result)
                {
                    if (error) next();
                });
            }
        });
        
        dbtools.removeBlogCollectionById(req.body._id, function(error)
        {
            if (error)
            {
                next();
            }
            else
            {
                res.status(200).end();
            }
        });
    }
    
    return __removeCollectionById;
}
/**********************blog collection manipulation******************/
module.exports = blogEditorMiddleware;