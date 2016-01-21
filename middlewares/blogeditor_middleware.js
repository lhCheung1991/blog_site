"use strict";

var dbtools = require("../database/dbtools");
var blogEditorMiddleware = {};

// var editor = function (req, res, next)
// {
//     console.log(req.body);
//     dbtools.saveNewBlog(req.body, function(error)
//     {
//         if (error)
//         {
//             res.status(500).end();
//         }
//         else
//         {
//             res.status(200).end();
//         }
//     });
    
//     var action = req.query.action;
//     switch(action)
//     {
//         case "editBlog":
//             break;
//         case "insertBlog":
//             break;
//     }
// };

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

module.exports = blogEditorMiddleware;