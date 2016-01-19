var express = require("express");
var dbtools = require("../database/dbtools");

var blogsPerPage = 8;

var bloglist = function(req, res, next)
{
    console.log("Get page number " + req.query.pageNum);
    
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
            var pageNum = Number(req.query.pageNum);
            dbtools.getBlogsPageNum(pageNum, blogsPerPage, function(error, result)
            {
                if (error)
                {
                    console.log(error);
                    res.status(500).end();
                }
                else
                {
                    res.render("bloglist", {pagesCnt: pages, blogs: result});
                }    
            });
            
        }
    });
    
    
    
    
}

module.exports = bloglist;