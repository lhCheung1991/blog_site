"use strict";

var dbtools = require("../database/dbtools");
var bloglistMiddleware = {};
var blogsPerPage = 8;

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
                var pages = Math.floor(count / blogsPerPage) + 1;
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

bloglistMiddleware.removeBlogById = function ()
{
    function __removeBlogById(req, res, next)
    {
        dbtools.removeBlogById(req.query.blogId, function(error)
        {
            if (error)
            {
                next();
            }
            else
            {
                res.redirect("/admin/bloglist");
            }
        });
    }
    return __removeBlogById;
}

module.exports = bloglistMiddleware;