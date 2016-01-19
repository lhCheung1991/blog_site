"use strict";

var express = require("express");
var adminRouter = express.Router();
var ueditorController = require("../react/ueditor_controller");
var blogeditor = require("../react/blogeditor");
var bloglist = require("../react/bloglist");

adminRouter.get("/blogeditor", function (req, res, next)
{
    res.render("blogeditor", {});
});

adminRouter.all("/blogeditor/control", ueditorController(
    {
        rootDir: "/Users/lhcheung1991/VScodeProjects/blog_site/",
        imagesDir: "public/images/",
        filesDir: "public/files/",
        configJsonFile: "/Users/lhcheung1991/VScodeProjects/blog_site/react/config.json"
    }
));

adminRouter.post("/blogeditor/store", blogeditor);

adminRouter.get("/bloglist", bloglist);

module.exports = adminRouter;