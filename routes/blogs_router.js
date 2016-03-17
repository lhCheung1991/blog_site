"use strict";

var express = require("express");
var blogsRouter = express.Router();

var blogsMiddleware = require("../middlewares/blogs_middleware");
var ueditorController = require("../middlewares/ueditor_controller");

blogsRouter.get("/checkblog", blogsMiddleware.checkBlog());    // /blogs/checkblog
blogsRouter.all("/commenteditor/controller", ueditorController(
    {
        rootDir: "/Users/lhcheung1991/VScodeProjects/blog_site/",
        imagesDir: "public/images/",
        filesDir: "public/files/",
        configJsonFile: "/Users/lhcheung1991/VScodeProjects/blog_site/middlewares/config.json"
    })
);

module.exports = blogsRouter;