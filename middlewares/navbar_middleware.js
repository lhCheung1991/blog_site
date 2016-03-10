"use strict";

var dbtools = require("../database/dbtools");
var navbarMiddleware = {};

navbarMiddleware.getBlogCollectionList = function ()
{
    function __getBlogCollectionList(req, res, next)
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
    
    return __getBlogCollectionList;
}

module.exports = navbarMiddleware;