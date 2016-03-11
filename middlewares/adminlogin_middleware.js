"use strict";

var dbtools = require("../database/dbtools");
var adminLoginMiddleware = {};

adminLoginMiddleware.getAdminLoginPage = function ()
{
    function __getAdminLoginPage(req, res, next)
    {
        if (req.cookies.uid === undefined)
        {
            console.log("Login cookie doesn't exist");
            res.render("adminlogin", {});
        }
        else if(req.cookies.uid === "lhcheung1991")
        {
            console.log("Login cookie " + req.cookies.uid);
            res.redirect("/admin/bloglist");
        }
    }
    
    return __getAdminLoginPage;
}

adminLoginMiddleware.authLoginCookie = function ()
{
    function __authLoginCookie(req, res, next)
    {
        if (req.cookies.uid === undefined)
        {
            console.log("Login cookie doesn't exist");
            res.render("adminlogin", {});
        }
        else if(req.cookies.uid === "lhcheung1991")
        {
            console.log("Login cookie " + req.cookies.uid);
            next();
        }
    }
    
    return __authLoginCookie;
}

adminLoginMiddleware.authAdminUser = function ()
{
    function __authAdminUser(req, res, next)
    {
        // console.log(req.body.cookie_expire_check);
        dbtools.getPasswordByUsername(req.body.username, function (error, result)
        {
            if (error)
            {
                res.status(500).end();
            }
            else
            {
                if (result.length === 1)
                {
                    if (result[0].password === req.body.password)
                    {
                        console.log("Login succeed");
                        // send the login succeed cookie
                        if (req.body.cookie_expire_check === "remember-me")
                        {
                            console.log("Login succeed and remember");
                            res.cookie("uid", "lhcheung1991", {expires: new Date(Date.now() + 259200000)});    
                        }
                        else
                        {
                            res.cookie("uid", "lhcheung1991");   
                        }
                        
                        res.redirect("/admin/bloglist");
                    }
                    else
                    {
                        console.log("Password error"); 
                        res.render("error", {});  
                    }
                }
                else
                {
                    // authenticated fail
                    console.log("User doesn't exist");
                    res.render("error", {});
                }
            }
        });
    }
    
    return __authAdminUser;
}

module.exports = adminLoginMiddleware;