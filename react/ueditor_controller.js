"use strict";

var fs = require("fs");
var os = require("os");
var path = require("path");
var Busboy = require('busboy');

var ueditorController = function ()
{
    return __ueditor;
};

var __ueditor = function (req, res, next)
{
    var action = req.query.action;
    switch (action)
    {
        case 'config':
            console.log("action: config");
            res.setHeader("Content-Type", "application/json");
            res.send(getConfigJson("/Users/lhcheung1991/VScodeProjects/blog_site/public/ueditor/php/config.json"));
            break;
        /* 上传图片 */
        case 'uploadimage':
            console.log("action: uploadimage");
            uploadFile(req, res);
            break;
        /* 上传涂鸦 */
        case 'uploadscrawl':
            break;
        /* 上传视频 */
        case 'uploadvideo':
            break;
        /* 上传文件 */
        case 'uploadfile':
            break;
        /* 列出图片 */
        case 'listimage':
            break;
        /* 列出文件 */
        case 'listfile':
            break;
        /* 抓取远程文件 */
        case 'catchimage':
            break;
    }
};

function getConfigJson(configFileName)
{
    var configJson = fs.readFileSync(configFileName, "utf-8");
    return configJson;
}

function uploadFile(req, res)
{
    var busboy = new Busboy({ headers: req.headers });
    
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) 
    {
        // var saveTo = path.join(os.tmpDir(), path.basename(fieldname));
        // file.pipe(fs.createWriteStream(saveTo));
        // console.log(getRealFileName(filename));
    });
    
    busboy.on('finish', function() 
    {
        res.writeHead(200, { 'Connection': 'close' });
        res.end("That's all folks!");
    });
    
    return req.pipe(busboy);
}

function getRealFileName(fileName)
{
    var curTimeStamp = new Date();
    var realFileName = [curTimeStamp.getFullYear(), curTimeStamp.getMonth() + 1, curTimeStamp.getDay(),
                        curTimeStamp.getHours(), curTimeStamp.getMinutes(), curTimeStamp.getSeconds(), 
                        curTimeStamp.getMilliseconds()].join("_");
    realFileName += path.extname(fileName);
    
    return realFileName;
}

module.exports = ueditorController;
