"use strict";

var dbtools = require("../database/dbtools");

var editor = function (req, res, next)
{
    console.log(req.body);
    dbtools.saveNewBlog(req.body);
    res.end();
};

module.exports = editor;