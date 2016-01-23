"use strict";

var dbtools = require("../database/dbtools");
var indexMiddleware = {};
var blogsPerPage = 8;

indexMiddleware.getBlogListPageNum = function ()
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
                        res.render("index", {pagesCnt: pages, blogs: result, curPageNum: pageNum});
                    }    
                });
            }
        });
    }
    
    return __getBlogListPageNum;
}

module.exports = indexMiddleware; 