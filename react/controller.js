"use strict";

var controllerUtils = require("./controller_utils");

var ueditorController = function(req, res, next)
{
    var action = req.query.action;
    switch(action)
    {
        case "config":
            console.log("config");
            res.setHeader("Content-Type", "application/json");
            var configData = controllerUtils.readConfigJson("/Users/lhcheung1991/VScodeProjects/blog_site/public/ueditor/php/config.json", "utf-8");
            res.send(configData);
            break;
            
        /* 上传图片 */
        case 'uploadimage':
            console.log(action);
            console.log(req.body);
            break;
        /* 上传涂鸦 */
        case 'uploadscrawl':
        /* 上传视频 */
        case 'uploadvideo':
        /* 上传文件 */
        case 'uploadfile':
            // $result = include("action_upload.php");
            break;
        /* 列出图片 */
        case 'listimage':
            // $result = include("action_list.php");
            break;
        /* 列出文件 */
        case 'listfile':
            // $result = include("action_list.php");
            break;
        /* 抓取远程文件 */
        case 'catchimage':
            // $result = include("action_crawler.php");
            break;
            
        default:
            res.render("edit", {});
            break;
    }
    
    
}

module.exports = ueditorController;