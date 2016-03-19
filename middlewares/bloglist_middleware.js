"use strict";

var dbtools = require("../database/dbtools");
var events = require("events");
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
                        var blogsWithCollections = [];
                        var finishCnt = 0;
                        var eventEmitter = new events.EventEmitter();
                        // define a event emitter, then you can emit an event
                        eventEmitter.on("render", function(error, result)
                        {
                            res.render("bloglist", {pagesCnt: pages, blogs: blogsWithCollections, curPageNum: pageNum});
                        });
                        
                        if (result.length === 0)
                        {
                            eventEmitter.emit("render");
                        } 
                        else
                        {
                            for (let idx = 0; idx < result.length; idx++)
                            {
                                var curCollectionId = result[idx].blogCollectionId || 0;
                                dbtools.getBlogCollectionById(curCollectionId, function(error, data)
                                {
                                    var curBlog = {};
                                    curBlog._id = result[idx]._id;
                                    curBlog.title = result[idx].title;
                                    curBlog.content = result[idx].content;
                                    curBlog.lastEditDate = result[idx].lastEditDate;
                                    if (data) curBlog.blogCollection = data.title;
                                    blogsWithCollections.push(curBlog);
                                    finishCnt++;
                                    if (finishCnt >= result.length) eventEmitter.emit("render");
                                });
                            }
                        }    
                        
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
                dbtools.removeCommentsByBlogId(req.query.blogId, function (error)
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
        });
    }
    return __removeBlogById;
}

module.exports = bloglistMiddleware;