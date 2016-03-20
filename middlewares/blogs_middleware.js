"use strict";

var dbtools = require("../database/dbtools");
var events = require("events");
var nodemailer = require('nodemailer');
var smtpTransport = require("nodemailer-smtp-transport");

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport(smtpTransport(
    {
        host: "smtp.qq.com",
        port: 465,
        auth: {
            name: "Linghan Cheung",
            user: "lhcheung1991@qq.com",
            pass: "zlh83915374"
        },
        ignoreTLS: true
    }
));

var blogsMiddleware = {};

blogsMiddleware.checkBlog = function ()
{
    function __checkBlogById(req, res, next)
    {
        var blogId = req.query.blogId;    // /blogs/checkblog?blogId=xxxxxxx
        dbtools.getBlogById(blogId, function (error, result)
        {
            if (error)
            {
                next();
            }
            else
            {
                dbtools.getAllCommentsByBlogId(blogId, function (error, comments)
                {
                    if (error)
                    {
                        next();
                    }
                    else
                    {   
                        var handledCommentsCnt = 0;
                        for (let idx = 0; idx < comments.length; idx++)
                        {
                            if (comments[idx].replyToId !== "000000000000")
                            {
                                dbtools.getCommentById(comments[idx].replyToId, function (error, oriCom)
                                {
                                    if (error)
                                    {
                                        next();
                                    }
                                    else
                                    {
                                        comments[idx].isHost = 0;
                                        comments[idx].originalComment = oriCom[0];
                                        handledCommentsCnt++;
                                        if (handledCommentsCnt >= comments.length)
                                        {
                                            if (result.blogCollectionId === "")
                                            {
                                                res.render("blog", {blog: result, comments: comments, relativeBlogs: {}});
                                            }
                                            else
                                            {
                                                dbtools.getBlogsByBlogCollectionId(result.blogCollectionId, function(err, results)
                                                {
                                                    if (error)
                                                    {
                                                        next();
                                                    }
                                                    else
                                                    {
                                                        res.render("blog", {blog: result, comments: comments, relativeBlogs: results});
                                                    }
                                                });   
                                            }
                                        }
                                    }
                                });
                            }
                            else
                            {
                                comments[idx].isHost = 1;
                                comments[idx].originalComment = undefined;
                                handledCommentsCnt++;
                                if (handledCommentsCnt >= comments.length)
                                {
                                    if (result.blogCollectionId === "")
                                    {
                                        res.render("blog", {blog: result, comments: comments, relativeBlogs: {}});
                                    }
                                    else
                                    {
                                        dbtools.getBlogsByBlogCollectionId(result.blogCollectionId, function(err, results)
                                        {
                                            if (error)
                                            {
                                                next();
                                            }
                                            else
                                            {
                                                res.render("blog", {blog: result, comments: comments, relativeBlogs: results});
                                            }
                                        });   
                                    }                
                                }
                            }
                        }
                        
                        if (comments.length === 0)
                        {
                            if (result.blogCollectionId === "")
                            {
                                res.render("blog", {blog: result, comments: comments, relativeBlogs: {}});
                            }
                            else
                            {
                                dbtools.getBlogsByBlogCollectionId(result.blogCollectionId, function(err, results)
                                {
                                    if (error)
                                    {
                                        next();
                                    }
                                    else
                                    {
                                        res.render("blog", {blog: result, comments: comments, relativeBlogs: results});
                                    }
                                });   
                            }   
                        }
                        
                    }
                });   
            }
        });
    }
    
    return __checkBlogById;
}

blogsMiddleware.commitComment = function ()
{
    function __commitComment(req, res, next)
    {
        dbtools.saveNewComment(req.body, function (error)
        {
            if (error)
            {
                next();
            }
            else
            {
                var toMails = "lhcheung1991@gmail.com, ";
                if (req.body.replyToId !== "000000000000")
                {
                    dbtools.getCommentById(req.body.replyToId, function (error, comment)
                    {
                        if (error)
                        {
                            next();
                        }
                        else
                        {
                            var nickName = comment[0].nickName;
                            var email = comment[0].email;
                            toMails = toMails + email + ", ";
                            sendMail(toMails, req.body.nickName, nickName, req.body.commentContent, req.body.blogId);
                        }
                    });
                }
                else
                {
                    sendMail(toMails, req.body.nickName, "Linghan Cheung", req.body.commentContent, req.body.blogId);
                }
                
                res.redirect('/blogs/checkblog?blogId=' + req.body.blogId + '#defaultCommentEditor');
            }
        });
    }
    
    return __commitComment;
}

function sendMail(sendToMails, reply, replyTo, content, blogId)
{
    // setup e-mail data with unicode symbols
    var mailOptions = 
    {
        from: '"Linghan Cheung" <lhcheung1991@qq.com>', // sender address
        to: sendToMails, // list of receivers
        subject: 'Notification from site of Linghan Cheung', // Subject line
        // text: 'Hello world 🐴', // plaintext body
        html: "<h2>您在Linghan Cheung's Site的评论有人回应了!<h2>" + "<h3>" + reply + " 回复了您(" + replyTo + ")以下内容.</h3>" + content + "<h3><a href='http://localhost:3000/blogs/checkblog?blogId=" + blogId + "#defaultCommentEditor'>请跳转到网站查看详情</a></h3>"// html body
    };
    
    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info)
    {
        if(error)
        {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
}

module.exports = blogsMiddleware;