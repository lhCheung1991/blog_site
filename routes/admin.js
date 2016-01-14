"use strict";

var express = require("express");
var adminRouter = express.Router();
var ueditorController = require("../react/controller");

adminRouter.all("/edit", ueditorController);

adminRouter.get("/", function(req, res, next)
{
    
});




module.exports = adminRouter;