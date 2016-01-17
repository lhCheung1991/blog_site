"use strict";

var express = require("express");
var adminRouter = express.Router();
var ueditorController = require("../react/ueditor_controller");
var editor = require("../react/editor");

adminRouter.get("/edit", function (req, res, next)
{
    res.render("edit", {});
});

adminRouter.all("/edit/control", ueditorController(
    {
        rootDir: "/Users/lhcheung1991/VScodeProjects/blog_site/",
        imagesDir: "public/images/",
        filesDir: "public/files/",
        configJsonFile: "/Users/lhcheung1991/VScodeProjects/blog_site/react/config.json"
    }
));

adminRouter.post("/edit/store", editor);

module.exports = adminRouter;