"use strict";

var express = require("express");
var adminRouter = express.Router();
var ueditorController = require("../middlewares/ueditor_controller");
var bloglistMiddleware = require("../middlewares/bloglist_middleware");
var blogEditorMiddleware = require("../middlewares/blogeditor_middleware");
var adminLoginMiddleware = require("../middlewares/adminlogin_middleware");

/**
 * adminRouter is the router entry of path /admin and its subpath, 
 * all the requests to /admin/bloglist and /admin/blogeditor should
 * be authenticated firstly 
 */

adminRouter.get("/bloglist", adminLoginMiddleware.authLoginCookie(), bloglistMiddleware.getBlogListPageNum());    // /admin/bloglist?pageNum=x

adminRouter.all("/blogeditor/controller", adminLoginMiddleware.authLoginCookie(), ueditorController(
    {
        rootDir: "/Users/lhcheung1991/VScodeProjects/blog_site/",
        imagesDir: "public/images/",
        filesDir: "public/files/",
        configJsonFile: "/Users/lhcheung1991/VScodeProjects/blog_site/middlewares/config.json"
    })
);

adminRouter.get("/blogeditor/updateblog/checkout", adminLoginMiddleware.authLoginCookie(), blogEditorMiddleware.checkoutBlogById());    // admin/blogeditor/updateblog/checkout?blogId=x
adminRouter.get("/blogeditor/updateblog/pullout", adminLoginMiddleware.authLoginCookie(), blogEditorMiddleware.pulloutBlogById());
adminRouter.post("/blogeditor/updateblog/pushupdatedblog", adminLoginMiddleware.authLoginCookie(), blogEditorMiddleware.pushUpdatedBlogById());    // /admin/blogeditor/updateblog/pushupdatedblog
adminRouter.get("/blogeditor/newblog/plaineditor", adminLoginMiddleware.authLoginCookie(), blogEditorMiddleware.checkoutPlainEditor());
adminRouter.post("/blogeditor/newblog/pushnewblog", adminLoginMiddleware.authLoginCookie(), blogEditorMiddleware.pushNewBlog());
adminRouter.get("/bloglist/removeblog", adminLoginMiddleware.authLoginCookie(), bloglistMiddleware.removeBlogById());
adminRouter.post("/blogeditor/newcollection", adminLoginMiddleware.authLoginCookie(), blogEditorMiddleware.saveNewBlogCollection());
adminRouter.get("/blogeditor/blogcollections/checkout", adminLoginMiddleware.authLoginCookie(), blogEditorMiddleware.checkoutAllBlogCollections());
adminRouter.post("/blogeditor/blogcollections/removecollection", adminLoginMiddleware.authLoginCookie(), blogEditorMiddleware.removeCollectionById());

adminRouter.get("/adminlogin", adminLoginMiddleware.getAdminLoginPage());
adminRouter.post("/adminlogin", adminLoginMiddleware.authAdminUser());

module.exports = adminRouter;