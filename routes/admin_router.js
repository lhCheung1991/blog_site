"use strict";

var express = require("express");
var adminRouter = express.Router();
var ueditorController = require("../middlewares/ueditor_controller");
var bloglistMiddleware = require("../middlewares/bloglist_middleware");
var blogEditorMiddleware = require("../middlewares/blogeditor_middleware");

adminRouter.get("/bloglist", bloglistMiddleware.getBlogListPageNum());    // /admin/bloglist?pageNum=x

adminRouter.all("/blogeditor/controller", ueditorController(
    {
        rootDir: "/Users/lhcheung1991/VScodeProjects/blog_site/",
        imagesDir: "public/images/",
        filesDir: "public/files/",
        configJsonFile: "/Users/lhcheung1991/VScodeProjects/blog_site/middlewares/config.json"
    })
);

adminRouter.get("/blogeditor/updateblog/checkout", blogEditorMiddleware.checkoutBlogById());    // admin/blogeditor/updateblog/checkout?blogId=x
adminRouter.get("/blogeditor/updateblog/pullout", blogEditorMiddleware.pulloutBlogById());
adminRouter.post("/blogeditor/updateblog/pushupdatedblog", blogEditorMiddleware.pushUpdatedBlogById());    // /admin/blogeditor/updateblog/pushupdatedblog
adminRouter.get("/blogeditor/newblog/plaineditor", blogEditorMiddleware.checkoutPlainEditor());
adminRouter.post("/blogeditor/newblog/pushnewblog", blogEditorMiddleware.pushNewBlog());
adminRouter.get("/bloglist/removeblog", bloglistMiddleware.removeBlogById());

module.exports = adminRouter;