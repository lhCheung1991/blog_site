"use strict";

var express = require("express");
var navbarRouter = express.Router();

var navbarMiddleware = require("../middlewares/navbar_middleware");

navbarRouter.get("/blogcollectionlist/checkout", navbarMiddleware.getBlogCollectionList());

module.exports = navbarRouter;