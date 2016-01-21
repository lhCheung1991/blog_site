"use strict";

var dbtools = require("../database/dbtools");
var bloglistMiddleware = {};
var blogsPerPage = 8;

// var bloglist = function(req, res, next)
// {   
//     console.log(req.query.action);
//     switch(req.query.action)
//     {
//         case "checkBlog":
//             res.redirect("/index/blogs?blogId=" + req.query.blogId);
//             break;
//         case "insertBlog":
//             break;
//         case "editBlog":
//             break;
//         case "getBlogsPage":
//             getBlogsPage(req, res, next);
//             break;
//         case "deleteBlog":
//             break;
//         case undefined:
//             req.query.pageNum = 1;
//             getBlogsPage(req, res, next);
//             break;
//     }
// }

bloglistMiddleware.getBlogListPageNum = function ()
{
    function __getBlogListPageNum(req, res, next)
    {
        dbtools.getAllBlogsCount(function(error, count)
        {
            if (error)
            {
                console.log(error);
                res.status(500).end();
            }
            else
            {
                var pages = count / blogsPerPage + 1;
                var pageNum = Number(req.query.pageNum || "1");
                dbtools.getBlogsPageNum(pageNum, blogsPerPage, function(error, result)
                {
                    if (error)
                    {
                        console.log(error);
                        res.status(500).end();
                    }
                    else
                    {
                        res.render("bloglist", {pagesCnt: pages, blogs: result, curPageNum: pageNum});
                    }    
                });
                
            }
        });
    }
    
    return __getBlogListPageNum;
}

module.exports = bloglistMiddleware;