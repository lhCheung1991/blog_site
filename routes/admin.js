"use strict";

var express = require("express");
var adminRouter = express.Router();

adminRouter.get("/", function(req, res, next)
{
    res.render("edit", {});
});

module.exports = adminRouter;