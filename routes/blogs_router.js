"use strict";

var express = require("express");
var blogsRouter = express.Router();

var blogsMiddleware = require("../middlewares/blogs_middleware");

blogsRouter.get("/checkblog", blogsMiddleware.checkBlog());    // /blogs/checkblog

module.exports = blogsRouter;