"use strict";

var express = require("express");
var adminRouter = express.Router();
var ueditorController = require("../react/ueditor_controller");

adminRouter.get("/edit", function (req, res, next)
{
    res.render("edit", {});
});

adminRouter.all("/edit/control", ueditorController());




module.exports = adminRouter;