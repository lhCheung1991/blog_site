"use strict";

var dbtools = require("../database/dbtools");

var editor = function (req, res, next)
{
    console.log(req.body);
    dbtools.saveNewBlog(req.body, function(error)
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
};

module.exports = editor;