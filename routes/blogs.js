"use strict";

var express = require("express");
var blogsRouter = express.Router();

var blogs = require("../react/blogs");

blogsRouter.get("/blogs", blogs);

module.exports = blogsRouter;