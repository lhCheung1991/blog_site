"use strict";

var dbtools = require("../database/dbtools");
var events = require("events");
var indexMiddleware = {};
var blogsPerPage = 4;

indexMiddleware.getBlogListPageNum = function ()
{
    function __getBlogListPageNum(req, res, next)
    {   
        var collectionId = req.query.blogCollectionId;
        if ( collectionId !== undefined && collectionId !== "default")    // undefined
        {
            dbtools.getBlogsCountByCollectionId(collectionId, function (error, count)
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
                    dbtools.getBlogsPageNumByCollectionId(collectionId, pageNum, blogsPerPage, function(error, result)
                    {
                        if (error)
                        {
                            console.log(error);
                            res.status(500).end();
                        }
                        else
                        {
                            var finishCnt = 0;
                            
                            var eventEmitter = new events.EventEmitter();
                            // define a event emitter, then you can emit an event
                            eventEmitter.on("render", function(error)
                            {
                                res.render("index", {pagesCnt: pages, blogs: result, curPageNum: pageNum, collectionId: collectionId});
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
                                        if (data) result[idx].blogCollection = data.title;
                                        
                                        dbtools.getCommentsCountByBlogId(result[idx]._id, function (error, commentCount)
                                        {
                                            if (error)
                                            {
                                                next();
                                            }
                                            else
                                            {
                                                result[idx].commentCount = commentCount;
                                                finishCnt++;
                                                if (finishCnt >= result.length) eventEmitter.emit("render");
                                            }
                                        });
                                        
                                    });
                                }
                            }
                        }    
                    });
                }
            });
        }
        else    // default 
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
                            var finishCnt = 0;
                            
                            var eventEmitter = new events.EventEmitter();
                            // define a event emitter, then you can emit an event
                            eventEmitter.on("render", function(error)
                            {
                                res.render("index", {pagesCnt: pages, blogs: result, curPageNum: pageNum, collectionId: "default"});
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
                                        if (data) result[idx].blogCollection = data.title;
                                        dbtools.getCommentsCountByBlogId(result[idx]._id, function (error, commentCount)
                                        {
                                            if (error)
                                            {
                                                next();
                                            }
                                            else
                                            {
                                                result[idx].commentCount = commentCount;
                                                finishCnt++;
                                                if (finishCnt >= result.length) eventEmitter.emit("render");
                                            }
                                        });
                                        
                                    });
                                }
                            }
                        }    
                    });
                }
            });
        }
    }
    
    return __getBlogListPageNum;
}

module.exports = indexMiddleware; 