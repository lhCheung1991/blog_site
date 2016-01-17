"use strict";

var fs = require("fs")
var fse = require('fs-extra')
var os = require("os");
var path = require("path");
var Busboy = require('busboy');

var configController = 
{
    rootDir: "",    // root directory of the site
    imagesDir: "",    // the diretory which will save the uploaded images
    filesDir: "",    // the diretory which will save the uploaded files
    configJsonFile: ""
};

var ueditorController = function (configControllerObj)
{
    for (var key in configControllerObj)
    {
        configController[key] = configControllerObj[key];
    }
    
    return __ueditor;
};

/**
 * the ueditor background middleware
 */
var __ueditor = function (req, res, next)
{
    var action = req.query.action;
    switch (action)
    {
        case 'config':
            console.log("action: config");
            res.setHeader("Content-Type", "application/json");
            res.send(getConfigJson(configController.configJsonFile));
            break;
        /* 上传图片 */
        case 'uploadimage':
            console.log("action: uploadimage");
            uploadFile(req, res, action);
            break;
        /* 上传涂鸦 */
        case 'uploadscrawl':
            break;
        /* 上传视频 */
        case 'uploadvideo':
            break;
        /* 上传文件 */
        case 'uploadfile':
            console.log("action: uploadfile");
            uploadFile(req, res, action);
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

function getRealFileName(fileName)
{
    var curTimeStamp = new Date();
    var realFileName = [curTimeStamp.getFullYear(), curTimeStamp.getMonth() + 1, curTimeStamp.getDay(),
                        curTimeStamp.getHours(), curTimeStamp.getMinutes(), curTimeStamp.getSeconds(), 
                        curTimeStamp.getMilliseconds()].join("_");
    realFileName += path.extname(fileName);
    
    return realFileName;
}

function uploadFile(req, res, action)
{
    var busboy = new Busboy({ headers: req.headers });
    
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) 
    {
        var realFileName = getRealFileName(filename);
        var saveTo = path.join(os.tmpDir(), realFileName);
        var saveToWriteStream = fs.createWriteStream(saveTo);
        file.pipe(saveToWriteStream);
        
        var resUploadState = 
        {
            url: "",    // this url will be set to the attribute src of tag IMG on the front end
            original: filename,    // original will be set to the attribute alt of tag IMG on the front end
        };
        
        file.on("end", function()
        {   
            console.log("Saving of uploaded file finished.");
            
            var moveTo;
            switch(action)
            {
                case "uploadimage":
                    moveTo = path.join(configController.rootDir, configController.imagesDir, realFileName);
                    break;
                case "uploadfile":
                    moveTo = path.join(configController.rootDir, configController.filesDir, realFileName);
                    break;       
            }
            
            fse.move(saveTo, moveTo, function (err)
            {   
                if (err) 
                {
                    console.log(err);
                    resUploadState.state = "ERROR";
                    res.setHeader("Content-Type", "application/json");
                    res.json(resUploadState);
                }
                else
                {
                    console.log("success!");
                    resUploadState.url = realFileName;
                    resUploadState.state = "SUCCESS";
                    res.setHeader("Content-Type", "application/json");
                    res.json(resUploadState);
                }
            });
        });
        
        file.on("error", function(error)
        {
            console.log("error: " + error);
            resUploadState.state = "ERROR";
            res.setHeader("Content-Type", "application/json");
            res.json(resUploadState);
        });
        
    });
    
    return req.pipe(busboy);
}

module.exports = ueditorController;
