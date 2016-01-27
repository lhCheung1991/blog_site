"use strict";

var express = require("express");
var loginRouter = express.Router();
var loginMiddleware = require("../middlewares/login_middleware");

loginRouter.get("/", loginMiddleware.getGithubAccessToken());

module.exports = loginRouter;