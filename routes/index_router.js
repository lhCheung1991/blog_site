"use strict";

var express = require("express");
var indexRouter = express.Router();

var indexMiddleware = require("../middlewares/index_middleware");

indexRouter.get("/", indexMiddleware.getBlogListPageNum());

module.exports = indexRouter;